import { Cron, CronExpression } from '@nestjs/schedule';
import { ResourceRepositoryImpl } from '../repositories/resource.repository.impl';
import { getDateDiff } from '../../utils/date';
import axios from 'axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Resource } from '../entities/rosource.entity';

@Injectable()
export class ResourceCheckService {
  constructor(private readonly resourceRepository: ResourceRepositoryImpl) {}

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
    return this.resourceRepository.save(api);
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
    const api = await this.resourceRepository.findById(id);
    if (!api) {
      throw new BadRequestException('API with provided id does not exists');
    }
    return this.checkAndUpdate(api);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkResourcesInBackground() {
    const apis = await this.resourceRepository.findAll();
    const promises = apis.map(async (api) => {
      await this.validateAndUpdate(api);
    });
    await Promise.all(promises);
  }
}
