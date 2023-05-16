import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesCheckService } from '../services/resources-check.service';
import { ResourcesService } from '../services/resources.service';
import { ResourcesController } from './resources.controller';

describe('ResourceController', () => {
  let controller: ResourcesController;
  let resourcesServiceMock: Partial<ResourcesService>;
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
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useValue: resourcesServiceMock,
        },
        {
          provide: ResourcesCheckService,
          useValue: resourcesCheckServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
