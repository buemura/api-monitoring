import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';

describe('AdminController', () => {
  let adminController: AdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [],
    }).compile();

    adminController = app.get<AdminController>(AdminController);
  });

  describe('health check', () => {
    it('should return "OK"', () => {
      expect(adminController.checkHealth()).toBe('OK');
    });
  });
});
