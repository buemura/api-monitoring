export class FakeWebsocketService {
  handleEvent(eventName: string, data: any) {
    console.log(
      `Emitting ${eventName} event to ${data?.id} timestamp: ${Date.now()}`,
    );
  }
}
