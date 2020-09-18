import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getEnv(): string {
    return `${process.env.BIZ_ENV} - ${this.configService.get('PORT')}`;
  }
}
