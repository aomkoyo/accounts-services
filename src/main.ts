import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './global.exception';
const logger = new Logger('Main');
async function bootstrap() {
  if (!process.env.RMQ_URL) {
    logger.error('RMQ_URL is not defined');
    return;
  }
  logger.log(`RMQ Queue: ${process.env.RMQ_QUEUE || 'template'}`);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.RMQ_QUEUE || 'template',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.listen();
}
bootstrap();

declare global {
  type Dictionary<V = any, K extends string | symbol = string> = Record<K, V>;
}