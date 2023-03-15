import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ always: true, transform: true }));
  app.enableShutdownHooks();
  await app.listen(3000);
}
start();
