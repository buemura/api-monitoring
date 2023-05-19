import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './controllers/resources.controller';
import { Resource } from './entities/rosource.entity';
import { ResourcesService } from './services/resources.service';
import { ResourcesRepositoryImpl } from './repositories/resources.repository.impl';
import { ResourcesCheckService } from './services/resources-check.service';
import { WebsocketModule } from '../../infra/websocket/websocket.module';
import { MessagingModule } from '../../infra/messaging/messaging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    WebsocketModule,
    MessagingModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourcesCheckService, ResourcesRepositoryImpl],
})
export class ResourcesModule {}
