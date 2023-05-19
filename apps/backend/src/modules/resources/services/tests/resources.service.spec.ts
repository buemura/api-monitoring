import { Test, TestingModule } from '@nestjs/testing';
import { resourcesMock } from '../../../../../test/__mocks__/data/resources';
import { InMemoryResourceRepository } from '../../../../../test/__mocks__/repositories/in-memory/resource.repository';
import { ResourcesRepositoryImpl } from '../../repositories/resources.repository.impl';
import { ResourcesService } from '../resources.service';

describe('ResourcesService', () => {
  let service: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesService,
        {
          provide: ResourcesRepositoryImpl,
          useClass: InMemoryResourceRepository,
        },
      ],
    }).compile();
    service = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getResources', () => {
    it('should return resources like name ', async () => {
      const query = {
        name: 'User',
      };
      const result = await service.getResources(query);
      expect(result).toEqual(resourcesMock.expectedResource);
    });

    it('should return all resources', async () => {
      const result = await service.getResources({});
      expect(result).toEqual(resourcesMock.resources);
    });
  });

  describe('getById', () => {
    it('should return the resource by id', async () => {
      const id = '967b7825-68d7-4643-a2fa-de98aea6c066';
      const result = await service.getById(id);
      expect(result).toEqual(resourcesMock.resources[1]);
    });
  });

  describe('getByName', () => {
    it('should return the resource by name', async () => {
      const name = 'Product registration';
      const result = await service.getByName(name);
      expect(result).toEqual([resourcesMock.resources[1]]);
    });
  });

  describe('createResource', () => {
    it('should return the resource created', async () => {
      const result = await service.createResource({
        name: 'Product registration',
        description: 'Product registration service',
        url: 'http://localhost:3001/api/health',
        accessToken: 'access_token',
        checkFrequency: 20000,
        notifyTo: 'john@email.com',
      });

      expect(result?.name).toEqual('Product registration');
    });
  });

  describe('updateResource', () => {
    it('should throw when resource does not exists', async () => {
      await expect(
        service.updateResource('non-existant', {
          name: 'Product registration',
          description: 'Product registration service',
          url: 'http://localhost:3001/api/health',
          accessToken: 'access_token',
          checkFrequency: 20000,
          notifyTo: 'john@email.com',
        }),
      ).rejects.toThrow('Resource not found');
    });

    it('should return the resource updated', async () => {
      const resource = await service.createResource({
        name: 'Product registration',
        description: 'Product registration service',
        url: 'http://localhost:3001/api/health',
        accessToken: 'access_token',
        checkFrequency: 20000,
        notifyTo: 'john@email.com',
      });
      expect(resource.checkFrequency).toEqual(20000);

      const result = await service.updateResource(resource.id, {
        ...resource,
        checkFrequency: 30000,
      });
      expect(result.checkFrequency).toEqual(30000);
    });
  });

  describe('removeResource', () => {
    it('should throw when resource does not exists', async () => {
      await expect(service.removeResource('non-existant')).rejects.toThrow(
        'Resource not found',
      );
    });

    it('should return the resource updated', async () => {
      const resource = await service.createResource({
        name: 'Product registration',
        description: 'Product registration service',
        url: 'http://localhost:3001/api/health',
        accessToken: 'access_token',
        checkFrequency: 20000,
        notifyTo: 'john@email.com',
      });

      const before = await service.getById(resource.id);
      expect(before).toBeDefined();

      await service.removeResource(resource.id);
      const after = await service.getById(resource.id);
      expect(after).not.toBeDefined();
    });
  });
});
