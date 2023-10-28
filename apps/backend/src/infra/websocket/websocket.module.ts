import { Module } from '@nestjs/common';

import { WebsocketService } from '@modules/websocket/websocket.service';
import { WebsocketServiceImpl } from './socketio/websocket.service.impl';

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
