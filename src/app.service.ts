import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getEnv(): string {
    return `ENV: ${process.env.BIZ_ENV} PORT: ${this.configService.get('PORT')}`;
  }
}
