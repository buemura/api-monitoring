import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from '@infra/database';
import { MessagingModule } from '@infra/messaging';
import { WebsocketModule } from '@infra/websocket';
import { HealthModule } from '@modules/health';
import { ResourceModule } from '@modules/resource';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'web/dist'),
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
    ResourceModule,
  ],
})
export class AppModule {}
