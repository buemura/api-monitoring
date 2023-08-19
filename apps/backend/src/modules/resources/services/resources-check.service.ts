import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { getDateDiff } from '../../../shared/date';
import { ProducerService } from '../../../infra/messaging/producer/producer.service';
import { ResourcesRepositoryImpl } from '../../../infra/database/typeorm/repositories/resources.repository.impl';
import { Resource } from '../entities/resource';
import { WebsocketService } from '../../../application/services/websocket.service';

@Injectable()
export class ResourcesCheckService {
  constructor(
    private readonly resourcesRepository: ResourcesRepositoryImpl,
    private readonly websocketProvider: WebsocketService,
    private readonly producerService: ProducerService,
  ) {}

  private async checkAndUpdate(api: Resource) {
    console.log(`Checking API ${api.id}`);
    const dataToSave = {
      ...api,
      lastCheck: new Date(),
    };

    try {
      const { status } = await axios.get(api.url);
      if (status !== 200) {
        throw new Error();
      }
      dataToSave.status = 'Up';
      console.log(`API ${api.id} is UP`);
    } catch (error) {
      dataToSave.status = 'Down';
      console.log(`API ${api.id} is DOWN`);
    }

    Object.assign(api, dataToSave);
    const result = await this.resourcesRepository.save(api);

    if (dataToSave.status === 'Down') {
      this.producerService.sendMessage('notify-api-down', result);
    }

    this.websocketProvider.handleEvent('resourceUpdate', result);
    return result;
  }

  private async validateAndUpdate(api: Resource) {
    const diff = getDateDiff(new Date(), api.updatedAt);
    if (diff < api.checkFrequency) {
      console.log(`Skipping API ${api.id}`);
      return;
    }
    return this.checkAndUpdate(api);
  }

  async checkResource(id: string) {
    const api = await this.resourcesRepository.findById(id);
    if (!api) {
      throw new BadRequestException('API with provided id does not exists');
    }
    return this.checkAndUpdate(api);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkResourcesInBackground() {
    const apis = await this.resourcesRepository.findAll();
    const promises = apis.map(async (api) => this.validateAndUpdate(api));
    await Promise.all(promises);
  }
}
