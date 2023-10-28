import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmResourceEntity } from '@infra/database/typeorm/entities/resource.entity';
import { ResourceRepositoryImpl } from '@infra/database/typeorm/repositories/resources.repository.impl';
import { MessagingModule } from '@infra/messaging/messaging.module';
import { WebsocketModule } from '@infra/websocket/websocket.module';
import { ResourceController } from './controllers/resources.controller';
import { ResourcesCheckService } from './services/resource-check.service';
import { ResourceService } from './services/resource.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmResourceEntity]),
    WebsocketModule,
    MessagingModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService, ResourcesCheckService, ResourceRepositoryImpl],
})
export class ResourceModule {}
