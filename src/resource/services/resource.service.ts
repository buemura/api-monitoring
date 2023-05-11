import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { Resource } from '../entities/rosource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,
  ) {}

  getResources(query: GetFilteredResources) {
    if (query.name) {
      return this.repository.find({
        where: {
          name: Like(`%${query.name}%`),
        },
      });
    }

    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  getByName(name: string) {
    return this.repository.find({ where: { name } });
  }

  createResource(body: CreateResourceDto) {
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
}
