import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Resource } from '../entities/rosource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceDto } from '../dtos/create-resource.dto';

@Injectable()
export class ResourceRepositoryImpl {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findByName(name: string) {
    return this.repository.find({
      where: { name },
    });
  }

  async findLikeName(name: string) {
    return this.repository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  async findById(id: string) {
    return this.repository.findOne({
      where: { id },
    });
  }

  create(body: CreateResourceDto) {
    return this.repository.create(body);
  }

  async save(resource: Resource) {
    return this.repository.save(resource);
  }

  async remove(resource: Resource) {
    return this.repository.remove(resource);
  }
}