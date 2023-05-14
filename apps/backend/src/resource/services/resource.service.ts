import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { getDateDiff } from '../../utils/date';
import { ResourceRepositoryImpl } from '../repositories/resource.repository.impl';

@Injectable()
export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepositoryImpl) {}

  async getResources(query: GetFilteredResources) {
    if (query.name) {
      return this.resourceRepository.findLikeName(query.name);
    }

    return this.resourceRepository.findAll();
  }

  async getById(id: string) {
    return this.resourceRepository.findById(id);
  }

  async getByName(name: string) {
    return this.resourceRepository.findByName(name);
  }

  async createResource(body: CreateResourceDto) {
    const resource = this.resourceRepository.create(body);
    return this.resourceRepository.save(resource);
  }

  async updateResource(id: string, body: UpdateResourceDto) {
    const resource = await this.resourceRepository.findById(id);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    Object.assign(resource, body);
    return this.resourceRepository.save(resource);
  }

  async remove(id: string) {
    const resource = await this.resourceRepository.findById(id);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return this.resourceRepository.remove(resource);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkResource() {
    const apis = await this.resourceRepository.findAll();

    const promises = apis.map(async (api) => {
      const diff = getDateDiff(new Date(), api.updatedAt);
      if (diff < api.checkFrequency) {
        console.log(`Skipping API ${api.id}`);
        return;
      }

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
      } catch (error) {
        dataToSave.status = 'Down';
      }

      await this.updateResource(api.id, dataToSave);
    });

    await Promise.all(promises);
  }
}
