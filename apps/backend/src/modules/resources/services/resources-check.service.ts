import axios from 'axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { getDateDiff } from '../../../shared/date';
import { ProducerService } from '../../../infra/messaging/producer/producer.service';
import { ResourcesRepositoryImpl } from '../../../infra/database/typeorm/repositories/resources.repository.impl';
import { Resource } from '../entities/resource';
import { WebsocketService } from '../../websocket/websocket.service';

@Injectable()
export class ResourcesCheckService {
  private logger: Logger;

  constructor(
    private readonly resourcesRepository: ResourcesRepositoryImpl,
    private readonly websocketProvider: WebsocketService,
    private readonly producerService: ProducerService,
  ) {
    this.logger = new Logger(ResourcesCheckService.name);
  }

  private async checkAndUpdate(api: Resource) {
    this.logger.log(`Checking API ${api.id}`);
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
      this.logger.log(`API ${api.id} is UP`);
    } catch (error) {
      dataToSave.status = 'Down';
      this.logger.log(`API ${api.id} is DOWN`);
    }

    Object.assign(api, dataToSave);
    const result = await this.resourcesRepository.save(api);

    if (dataToSave.status === 'Down') {
      this.producerService.sendMessage('notify-api-down', {
        id: result.id,
        name: result.name,
        description: result.description,
        url: result.url,
        status: result.status,
        lastCheck: result.lastCheck,
        notifyTo: result.notifyTo,
      });
    }

    this.websocketProvider.handleEvent('resourceUpdate', result);
    return result;
  }

  private async validateAndUpdate(api: Resource) {
    const diff = getDateDiff(new Date(), api.updatedAt);
    if (diff < api.checkFrequency) {
      this.logger.log(`Skipping API ${api.id}`);
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
