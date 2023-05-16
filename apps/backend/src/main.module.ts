import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './modules/app/app.controller';
import { ResourcesModule } from './modules/resources/resources.module';
import { DatabaseModule } from './infra/database/database.module';
import { WebsocketModule } from './infra/websocket/websocket.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    WebsocketModule,
    DatabaseModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class MainModule {}
