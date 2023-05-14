import { randomUUID } from 'crypto';
import { CreateResourceDto } from '../../../../src/resource/dtos/create-resource.dto';
import { Resource } from '../../../../src/resource/entities/rosource.entity';
import { resourcesMock } from '../../data/resources';

export class InMemoryResourceRepository {
  private resources: Resource[] = resourcesMock.resources;

  async findAll() {
    return this.resources;
  }

  async findByName(name: string) {
    return this.resources.filter((resource) => resource.name === name);
  }

  async findLikeName(name: string) {
    return this.resources.filter((resource) => resource.name.includes(name));
  }

  async findById(id: string) {
    return this.resources.find((resource) => resource.id === id);
  }

  create(body: CreateResourceDto) {
    const resource = new Resource();
    resource.id = randomUUID();
    resource.name = body.name;
    resource.description = body.description || null;
    resource.url = body.url;
    resource.accessToken = body.accessToken || null;
    resource.checkFrequency = body.checkFrequency;
    resource.status = null;
    resource.lastCheck = null;
    resource.createdAt = new Date();
    resource.updatedAt = new Date();
    return resource;
  }

  async save(resource: Resource) {
    return this.resources.push(resource);
  }

  async remove(resource: Resource) {
    const index = this.resources.findIndex((res) => res === resource);
    this.resources.splice(index, 1);
    return resource;
  }
}
