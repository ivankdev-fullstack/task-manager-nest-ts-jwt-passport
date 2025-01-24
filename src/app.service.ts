import { Injectable } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { TypedConfigService } from './config/typed-config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: TypedConfigService) {}

  public test() {
    console.log(this.configService.get<AppConfig>('app')?.messagePrefix);
  }
}
