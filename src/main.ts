import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MjmlModule } from './mjml.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(MjmlModule, new FastifyAdapter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  await app.listen(3000);
};
bootstrap();
