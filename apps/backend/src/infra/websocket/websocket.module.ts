import { Module } from '@nestjs/common';
import { WebsocketServiceImpl } from './socketio/websocket.service.impl';
import { WebsocketService } from '../../modules/websocket/websocket.service';

@Module({
  providers: [
    {
      provide: WebsocketService,
      useClass: WebsocketServiceImpl,
    },
  ],
  exports: [
    {
      provide: WebsocketService,
      useClass: WebsocketServiceImpl,
    },
  ],
})
export class WebsocketModule {}
