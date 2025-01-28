import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/entity/user.dto';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './entity/login.dto';
import { LoginResponse } from './entity/login.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return { accessToken };
  }
}
