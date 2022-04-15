import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/version')
  getVersion(): any {
    const response = { version: '1.0.0' };
    return response;
  }
  @Get('**')
  getNotFound() {
    return { mensaje: 'no se encontro la ruta' };
  }
}
