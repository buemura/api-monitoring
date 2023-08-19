import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('health')
export class AdminController {
  @Get()
  checkHealth(): string {
    return 'OK';
  }
}
