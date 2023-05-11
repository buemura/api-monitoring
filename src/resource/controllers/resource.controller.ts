import { Body, Controller, Post } from '@nestjs/common';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { ResourceService } from '../services/resource.service';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  addResource(@Body() body: CreateResourceDto) {
    return this.resourceService.createResource(body);
  }
}
