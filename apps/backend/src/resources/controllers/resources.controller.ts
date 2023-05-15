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
import { ResourcesService } from '../services/resources.service';
import { ResourcesCheckService } from '../services/resources-check.service';

@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesCheckService: ResourcesCheckService,
  ) {}

  @Get()
  async getResources(@Query() query: GetFilteredResources) {
    return this.resourcesService.getResources(query);
  }

  @Get(':resourceId')
  async getResourceById(@Param('resourceId') resourceId: string) {
    return this.resourcesService.getById(resourceId);
  }

  @Post()
  async addResource(@Body() body: CreateResourceDto) {
    return this.resourcesService.createResource(body);
  }

  @Patch(':resourceId')
  async updateResource(
    @Param('resourceId') resourceId: string,
    @Body() body: UpdateResourceDto,
  ) {
    return this.resourcesService.updateResource(resourceId, body);
  }

  @Delete(':resourceId')
  async removeUser(@Param('resourceId') resourceId: string) {
    return this.resourcesService.remove(resourceId);
  }

  @Get(':resourceId/check')
  async checkResource(@Param('resourceId') resourceId: string) {
    return this.resourcesCheckService.checkResource(resourceId);
  }
}
