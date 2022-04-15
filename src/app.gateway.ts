import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('WS-notificador');
  afterInit(server: any) {
    this.logger.log('Iniciado');
  }
  @SubscribeMessage('notificacion')
  notification(socket: Socket, data: any): WsResponse<any> {
    return { event: 'notificacion', data };
  }
  @SubscribeMessage('mensaje')
  message(socket: Socket, data: any): WsResponse<any> {
    return { event: 'mensaje', data };
  }
  sendNotification(data: any) {
    this.wss.emit(data);
  }
}
