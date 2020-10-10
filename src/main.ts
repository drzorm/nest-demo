import 'reflect-metadata';

import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // compression - gzip压缩
  app.use(compression());

  // express-rate-limit - 限速, 防止暴力攻击
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  if (process.env.BIZ_ENV !== 'prod') {
    // 非生产环境

    //  cors - 跨源资源共享
    // https://github.com/expressjs/cors#configuration-options
    app.enableCors();

    // Swagger 文档
    const options = new DocumentBuilder()
      .setTitle('Api Docs')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(app, options),
    );
  }

  await app.listen(process.env.PORT);
}
bootstrap();
