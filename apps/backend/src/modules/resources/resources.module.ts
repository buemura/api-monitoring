import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WebsocketModule } from '../../infra/websocket/websocket.module';
import { MessagingModule } from '../../infra/messaging/messaging.module';
import { ResourcesController } from './controllers/resources.controller';
import { TypeOrmResourceEntity } from '../../infra/database/typeorm/entities/resource.entity';
import { ResourcesService } from './services/resources.service';
import { ResourcesRepositoryImpl } from '../../infra/database/typeorm/repositories/resources.repository.impl';
import { ResourcesCheckService } from './services/resources-check.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmResourceEntity]),
    WebsocketModule,
    MessagingModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourcesCheckService, ResourcesRepositoryImpl],
})
export class ResourcesModule {}
