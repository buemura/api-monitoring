import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { TypeOrmResourceEntity } from '../entities/resource.entity';
import { CreateResourceDto } from '../../../../modules/resources/dtos/create-resource.dto';
import { ResourcesRepository } from '../../../../modules/resources/repositories/resource.repository';

@Injectable()
export class ResourcesRepositoryImpl implements ResourcesRepository {
  constructor(
    @InjectRepository(TypeOrmResourceEntity)
    private readonly repository: Repository<TypeOrmResourceEntity>,
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

  async save(resource: TypeOrmResourceEntity) {
    return this.repository.save(resource);
  }

  async remove(resource: TypeOrmResourceEntity) {
    return this.repository.remove(resource);
  }
}
