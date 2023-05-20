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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResourceDto } from '../dtos/create-resource.dto';
import { GetFilteredResources } from '../dtos/get-filtered-resources.dto';
import { UpdateResourceDto } from '../dtos/update-resource.dto';
import { TypeOrmResourceEntity } from '../../../infra/database/typeorm/entities/resource.entity';
import { ResourcesCheckService } from '../services/resources-check.service';
import { ResourcesService } from '../services/resources.service';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly resourcesCheckService: ResourcesCheckService,
  ) {}

  @ApiOkResponse({ type: TypeOrmResourceEntity, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getResources(@Query() query: GetFilteredResources) {
    return this.resourcesService.getResources(query);
  }

  @ApiOkResponse({ type: TypeOrmResourceEntity })
  @Get(':resourceId')
  async getResourceById(@Param('resourceId') resourceId: string) {
    return this.resourcesService.getById(resourceId);
  }

  @ApiCreatedResponse({ type: TypeOrmResourceEntity })
  @Post()
  async addResource(@Body() body: CreateResourceDto) {
    return this.resourcesService.createResource(body);
  }

  @ApiOkResponse({ type: TypeOrmResourceEntity })
  @ApiNotFoundResponse()
  @Patch(':resourceId')
  async updateResource(
    @Param('resourceId') resourceId: string,
    @Body() body: UpdateResourceDto,
  ) {
    return this.resourcesService.updateResource(resourceId, body);
  }

  @ApiOkResponse({ type: TypeOrmResourceEntity })
  @ApiNotFoundResponse()
  @Delete(':resourceId')
  async removeUser(@Param('resourceId') resourceId: string) {
    return this.resourcesService.removeResource(resourceId);
  }

  @Get(':resourceId/check')
  async checkResource(@Param('resourceId') resourceId: string) {
    return this.resourcesCheckService.checkResource(resourceId);
  }
}
