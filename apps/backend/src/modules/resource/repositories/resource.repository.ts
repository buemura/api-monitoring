import { CreateResourceDto } from '../dtos/create-resource.dto';
import { Resource } from '../entities/resource';

export interface ResourceRepository {
  findAll: () => Promise<Resource[]>;
  findByName: (name: string) => Promise<Resource[]>;
  findLikeName: (name: string) => Promise<Resource[]>;
  findById: (id: string) => Promise<Resource>;
  create: (body: CreateResourceDto) => Resource;
  save: (resource: Resource) => Promise<Resource>;
  remove: (resource: Resource) => Promise<Resource>;
}
