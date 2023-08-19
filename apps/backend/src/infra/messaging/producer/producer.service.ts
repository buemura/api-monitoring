import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('BACKEND_SERVICE') private client: ClientProxy) {}

  sendMessage(pattern: string, message: any) {
    console.log('Message sent:', {
      pattern,
      message,
    });
    this.client.emit(pattern, message);
  }
}
