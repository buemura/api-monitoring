import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resource } from '../../modules/resources/entities/rosource.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.sqlite',
      entities: [Resource],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
