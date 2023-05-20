import { TypeOrmResourceEntity } from '../../../infra/database/typeorm/entities/resource.entity';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { Resource } from '../entities/resource';

export interface ResourcesRepository {
  findAll: () => Promise<Resource[]>;
  findByName: (name: string) => Promise<Resource[]>;
  findLikeName: (name: string) => Promise<Resource[]>;
  findById: (id: string) => Promise<Resource>;
  create: (body: CreateResourceDto) => Resource;
  save: (resource: TypeOrmResourceEntity) => Promise<Resource>;
  remove: (resource: TypeOrmResourceEntity) => Promise<Resource>;
}
