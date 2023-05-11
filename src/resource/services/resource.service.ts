import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { Resource } from '../entities/rosource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,
  ) {}

  createResource(body: CreateResourceDto) {
    const resource = this.repository.create(body);
    return this.repository.save(resource);
  }
}
