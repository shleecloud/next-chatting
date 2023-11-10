import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8080, {
  cors: true,
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  counter = 0;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server): void {
    this.logger.log('Socket.io Init ✅');
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('message', { message: `Client connected: ${client.id}` });
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleChatMessage(client: Socket, data: any): void {
    // 클라이언트가 보낸 채팅 메시지를 해당 방으로 전달합니다.
    // this.server.emit('message', { message: data.message, userId: client.id });
    this.server.emit('message', { userId: client.id, message: data.message });
    this.logger.log(`Client send message: ${data.message} and ${++this.counter}`);
  }
}
