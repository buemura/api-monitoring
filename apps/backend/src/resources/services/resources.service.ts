import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { ResourcesRepositoryImpl } from '../repositories/resources.repository.impl';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesRepository: ResourcesRepositoryImpl) {}

  async getResources(query: GetFilteredResources) {
    if (query.name) {
      return this.resourcesRepository.findLikeName(query.name);
    }

    return this.resourcesRepository.findAll();
  }

  async getById(id: string) {
    return this.resourcesRepository.findById(id);
  }

  async getByName(name: string) {
    return this.resourcesRepository.findByName(name);
  }

  async createResource(body: CreateResourceDto) {
    const resource = this.resourcesRepository.create(body);
    return this.resourcesRepository.save(resource);
  }

  async updateResource(id: string, body: UpdateResourceDto) {
    const resource = await this.resourcesRepository.findById(id);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    Object.assign(resource, body);
    return this.resourcesRepository.save(resource);
  }

  async remove(id: string) {
    const resource = await this.resourcesRepository.findById(id);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return this.resourcesRepository.remove(resource);
  }
}
