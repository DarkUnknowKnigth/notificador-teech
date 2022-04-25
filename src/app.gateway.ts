import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface Notification {
  segmento?: string;
  titulo: string;
  contenido: string;
  url: string;
  boletin: any;
  publicacion: any;
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('WS-notificador');
  afterInit() {
    this.logger.log('Iniciado');
  }
  @SubscribeMessage('notificador')
  notification(socket: Socket, data: Notification): void {
    this.logger.log('notificacion enviada');
    this.logger.log(data);
    this.wss.emit('notificacion', data);
  }
  @SubscribeMessage('mensajero')
  message(socket: Socket, data: Notification): void {
    this.wss.emit('mensaje' + data.segmento, data);
  }
}
