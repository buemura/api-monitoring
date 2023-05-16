import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryResourceRepository } from '../../../../../test/__mocks__/repositories/in-memory/resource.repository';
import { FakeWebsocketService } from '../../../../../test/__mocks__/services/fake-websocket.service';
import { WebsocketService } from '../../../../infra/websocket/websocket.service';
import { ResourcesRepositoryImpl } from '../../repositories/resources.repository.impl';
import { ResourcesCheckService } from '../resources-check.service';

describe('ResourcesCheckService', () => {
  let service: ResourcesCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesCheckService,
        {
          provide: ResourcesRepositoryImpl,
          useClass: InMemoryResourceRepository,
        },
        {
          provide: WebsocketService,
          useClass: FakeWebsocketService,
        },
      ],
    }).compile();
    service = module.get<ResourcesCheckService>(ResourcesCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkResource', () => {
    it('should throw when resource does not exists', async () => {
      await expect(service.checkResource('1234')).rejects.toThrow(
        'API with provided id does not exists',
      );
    });
  });
});
