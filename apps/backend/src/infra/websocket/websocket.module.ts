import { Module } from '@nestjs/common';
import { WebsocketServiceImpl } from './websocket.service.impl';
import { WebsocketService } from '../../application/services/websocket.service';

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
