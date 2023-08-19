import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  private logger: Logger;

  constructor(@Inject('BACKEND_SERVICE') private client: ClientProxy) {
    this.logger = new Logger();
  }

  sendMessage(pattern: string, message: any) {
    this.logger.log('Message sent:', {
      pattern,
      message,
    });
    this.client.emit(pattern, message);
  }
}
