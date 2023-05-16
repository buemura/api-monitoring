import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(8081, { cors: '*' })
export class WebsocketService {
  @WebSocketServer()
  server: Server;

  handleEvent(eventName: string, data: any) {
    console.log(
      `Emitting ${eventName} event to ${data?.id} timestamp: ${Date.now()}`,
    );
    this.server.emit(eventName, data);
  }
}
