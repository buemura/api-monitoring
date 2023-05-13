import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { Resource } from '../entities/rosource.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,
  ) {}

  async getResources(query: GetFilteredResources) {
    if (query.name) {
      return this.repository.find({
        where: {
          name: Like(`%${query.name}%`),
        },
      });
    }

    return this.repository.find();
  }

  async getById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async getByName(name: string) {
    return this.repository.find({ where: { name } });
  }

  async createResource(body: CreateResourceDto) {
    const resource = this.repository.create(body);
    return this.repository.save(resource);
  }

  async updateResource(id: string, body: UpdateResourceDto) {
    const resource = await this.repository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    Object.assign(resource, body);
    return this.repository.save(resource);
  }

  async remove(id: string) {
    const resource = await this.repository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return this.repository.remove(resource);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkResource() {
    const apis = await this.repository.find();

    const promises = apis.map(async (api) => {
      const nowInTimestamp = Date.parse(new Date().toString());
      const updatedAtInTimestamp = Date.parse(api.updatedAt.toString());
      const diff = nowInTimestamp - updatedAtInTimestamp;

      if (diff < api.checkFrequency) {
        console.log(`Skipping API ${api.id}`);
        return;
      }

      console.log(`Checking API ${api.id}`);
      const { status, data } = await axios.get(api.url);
      if (status === 200) {
        const dataToSave = {
          ...api,
          status: data,
          lastCheck: new Date(),
        };

        await this.updateResource(api.id, dataToSave);
      }
    });

    await Promise.all(promises);
  }
}
