import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from './infra/database/database.module';
import { MessagingModule } from './infra/messaging/messaging.module';
import { WebsocketModule } from './infra/websocket/websocket.module';
import { HealthModule } from './modules/health/health.module';
import { ResourcesModule } from './modules/resources/resources.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'web/dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    ScheduleModule.forRoot(),
    WebsocketModule,
    DatabaseModule,
    MessagingModule,
    HealthModule,
    ResourcesModule,
  ],
})
export class AppModule {}
