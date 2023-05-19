import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { MessagingModule } from 'src/infra/messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
