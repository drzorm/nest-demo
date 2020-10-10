import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

ConfigModule.forRoot({
  envFilePath: [`.env.${process.env.BIZ_ENV}`, '.env'],
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [`${__dirname}/**/*.entity.{js,ts}`],
      migrations: [`${__dirname}/**/*.migration.{js,ts}`],
      subscribers: [`${__dirname}/**/*.subscriber.{js,ts}`],
    }),
    ConfigModule,
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
