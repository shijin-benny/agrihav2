import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import expressip = require('express-ip');
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  app.enableCors({
    origin: [
      'https://www.agriha.com',
      'https://agriha.com',
      'https://agriha.arclif.com',
      'http://192.168.29.27:3000/',
      'http://192.168.29.158:3000/',
      'http://192.168.29.30:3000/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  );
  app.use(expressip().getIpInfoMiddleware);
  const port = process.env.PORT || 8081;
  await app.listen(port, () => {
    console.log('Hello world listening on port', port);
  });
}
bootstrap();
