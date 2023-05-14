import { Test, TestingModule } from '@nestjs/testing';
import { ResourceController } from './resource.controller';
import { ResourceService } from '../services/resource.service';

describe('ResourceController', () => {
  let controller: ResourceController;
  let resourceServiceMock: Partial<ResourceService>;

  beforeEach(async () => {
    resourceServiceMock = {
      getResources: jest.fn().mockReturnValue([]),
      getById: jest.fn().mockReturnValue({}),
      getByName: jest.fn().mockReturnValue([]),
      createResource: jest.fn().mockReturnValue({}),
      updateResource: jest.fn().mockReturnValue({}),
      remove: jest.fn().mockReturnValue({}),
      checkResource: jest.fn().mockReturnValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: resourceServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ResourceController>(ResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
