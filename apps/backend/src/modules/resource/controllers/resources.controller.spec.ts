import { Test, TestingModule } from '@nestjs/testing';

import { ResourcesCheckService } from '../services/resource-check.service';
import { ResourceService } from '../services/resource.service';
import { ResourceController } from './resources.controller';

describe('ResourceController', () => {
  let controller: ResourceController;
  let resourcesServiceMock: Partial<ResourceService>;
  let resourcesCheckServiceMock: Partial<ResourcesCheckService>;

  beforeEach(async () => {
    resourcesServiceMock = {
      getResources: jest.fn().mockReturnValue([]),
      getById: jest.fn().mockReturnValue({}),
      getByName: jest.fn().mockReturnValue([]),
      createResource: jest.fn().mockReturnValue({}),
      updateResource: jest.fn().mockReturnValue({}),
      removeResource: jest.fn().mockReturnValue({}),
    };

    resourcesCheckServiceMock = {
      checkResource: jest.fn().mockReturnValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: resourcesServiceMock,
        },
        {
          provide: ResourcesCheckService,
          useValue: resourcesCheckServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ResourceController>(ResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
