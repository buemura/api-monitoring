import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(8081, { cors: '*' })
export class WebsocketServiceImpl {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(WebsocketServiceImpl.name);
  }

  @WebSocketServer()
  server: Server;

  handleEvent(eventName: string, data: any) {
    this.logger.log(`Emitting ${eventName} event for ${data?.id}`);
    this.server.emit(eventName, data);
  }
}
