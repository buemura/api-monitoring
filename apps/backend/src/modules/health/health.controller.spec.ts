import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('health check', () => {
    it('should return "OK"', () => {
      expect(healthController.checkHealth()).toBe('OK');
    });
  });
});
