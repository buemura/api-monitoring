import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app/app.controller';
import { ResourcesModule } from './resources/resources.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), ResourcesModule],
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
