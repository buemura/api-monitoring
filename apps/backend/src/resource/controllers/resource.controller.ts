import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { ResourceService } from '../services/resource.service';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async getResources(@Query() query: GetFilteredResources) {
    return this.resourceService.getResources(query);
  }

  @Get(':resourceId')
  async getResourceById(@Param('resourceId') resourceId: string) {
    return this.resourceService.getById(resourceId);
  }

  @Post()
  async addResource(@Body() body: CreateResourceDto) {
    return this.resourceService.createResource(body);
  }

  @Patch(':resourceId')
  async updateResource(
    @Param('resourceId') resourceId: string,
    @Body() body: UpdateResourceDto,
  ) {
    return this.resourceService.updateResource(resourceId, body);
  }

  @Delete(':resourceId')
  async removeUser(@Param('resourceId') resourceId: string) {
    return this.resourceService.remove(resourceId);
  }
}
