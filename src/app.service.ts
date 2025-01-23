import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { ConfigType } from './config/config.types';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService<ConfigType>) {}

  public test() {
    console.log(this.configService.get<AppConfig>('app')?.messagePrefix);
  }
}
