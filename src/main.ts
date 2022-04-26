import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Routes Middlewares
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  //Serve api
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();