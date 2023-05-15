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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Resource } from '../entities/rosource.entity';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesCheckService: ResourcesCheckService,
  ) {}

  @ApiOkResponse({ type: Resource, isArray: true })
  @Get()
  async getResources(@Query() query: GetFilteredResources) {
    return this.resourcesService.getResources(query);
  }

  @ApiOkResponse({ type: Resource })
  @Get(':resourceId')
  async getResourceById(@Param('resourceId') resourceId: string) {
    return this.resourcesService.getById(resourceId);
  }

  @ApiCreatedResponse({ type: Resource })
  @Post()
  async addResource(@Body() body: CreateResourceDto) {
    return this.resourcesService.createResource(body);
  }

  @ApiOkResponse({ type: Resource })
  @Patch(':resourceId')
  async updateResource(
    @Param('resourceId') resourceId: string,
    @Body() body: UpdateResourceDto,
  ) {
    return this.resourcesService.updateResource(resourceId, body);
  }

  @ApiOkResponse({ type: Resource })
  @Delete(':resourceId')
  async removeUser(@Param('resourceId') resourceId: string) {
    return this.resourcesService.remove(resourceId);
  }

  @Get(':resourceId/check')
  async checkResource(@Param('resourceId') resourceId: string) {
    return this.resourcesCheckService.checkResource(resourceId);
  }
}
