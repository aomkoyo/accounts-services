import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @MessagePattern('v4.stats')
  getStats() {
    return [200, this.app.getStats()];
  }
}
