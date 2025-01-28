import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { AuthConfig } from './../config/auth.config';
import { TypedConfigService } from './../config/typed-config.service';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService) => ({
        secret: config.get<AuthConfig>('auth')?.jwt.secret,
        signOptions: {
          expiresIn: config.get<AuthConfig>('auth')?.jwt.expiresIn,
        },
      }),
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
