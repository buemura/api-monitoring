import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesService } from './resources.service';
import { ResourcesRepositoryImpl } from '../repositories/resources.repository.impl';
import { InMemoryResourceRepository } from '../../../../test/__mocks__/repositories/in-memory/resource.repository';
import { resourcesMock } from '../../../../test/__mocks__/data/resources';

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
});
