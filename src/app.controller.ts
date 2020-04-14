import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Client,
  Transport,
  ClientProxy,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @MessagePattern({ cmd: 'message' })
  private sayHello() {
    return {
      message: 'Hello Nest.js',
    };
  }

  @Get()
  getHello() {
    return this.client.send({ cmd: 'message' }, "");
  }
}
