import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceController } from './controllers/resource.controller';
import { Resource } from './entities/rosource.entity';
import { ResourceService } from './services/resource.service';
import { ResourceRepositoryImpl } from './repositories/resource.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService, ResourceRepositoryImpl],
})
export class ResourceModule {}
