import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AdminController } from './modules/admin/admin.controller';
import { ResourcesModule } from './modules/resources/resources.module';
import { DatabaseModule } from './infra/database/database.module';
import { WebsocketModule } from './infra/websocket/websocket.module';
import { MessagingModule } from './infra/messaging/messaging.module';

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
    ResourcesModule,
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
