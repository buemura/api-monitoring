import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ResourcesRepositoryImpl } from '../repositories/resources.repository.impl';
import { getDateDiff } from '../../utils/date';
import { Resource } from '../entities/rosource.entity';
import { WebsocketService } from '../../websocket/websocket.service';

@Injectable()
export class ResourcesCheckService {
  constructor(
    private readonly resourcesRepository: ResourcesRepositoryImpl,
    private readonly websocketProvider: WebsocketService,
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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkResourcesInBackground() {
    const apis = await this.resourcesRepository.findAll();
    const promises = apis.map(async (api) => {
      await this.validateAndUpdate(api);
    });
    await Promise.all(promises);
  }
}
