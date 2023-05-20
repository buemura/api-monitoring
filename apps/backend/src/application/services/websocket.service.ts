export abstract class WebsocketService {
  abstract handleEvent(eventName: string, data: any): void;
}
