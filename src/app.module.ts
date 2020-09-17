import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const envFilePath = [`.env.${process.env.BIZ_ENV}`, '.env'];
if (process.env.BIZ_ENV === 'local') envFilePath.unshift('.env.local');

ConfigModule.forRoot({ envFilePath });

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
