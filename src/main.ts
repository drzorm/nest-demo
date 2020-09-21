import 'reflect-metadata';

import * as compression from 'compression';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

// import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // compression - gzip压缩
  app.use(compression());

  // csurf - 跨站点请求伪造
  // app.use(csurf());

  //  cors - 跨源资源共享
  // https://github.com/expressjs/cors#configuration-options
  app.enableCors();

  // express-rate-limit - 限速, 防止暴力攻击
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Swagger 文档
  const options = new DocumentBuilder()
    .setTitle('Api Docs')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, options));

  await app.listen(process.env.PORT);
}
bootstrap();
