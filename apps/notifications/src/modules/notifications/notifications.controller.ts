import { EventPattern } from '@nestjs/microservices';

export class NotificationsController {
  @EventPattern('notify-api-down')
  async handleApiDownEvent(data: Record<string, unknown>) {
    console.log(data);
  }
}
