import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/user/decorators/public.decorator';
import { Roles } from 'src/user/decorators/roles.decorator';
import { CreateUserDto } from 'src/user/entity/user.dto';
import { User } from 'src/user/entity/user.entity';
import { AdminResponse, UserRole } from 'src/user/entity/user.types';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './entity/login.dto';
import { AuthRequest, LoginResponse } from './entity/login.types';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/profile')
  async profile(@Request() req: AuthRequest): Promise<User> {
    const user = await this.userService.getById(req.user.sub);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  async adminOnly(): Promise<AdminResponse> {
    return new AdminResponse({ message: 'This is for admins only!' });
  }

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return new LoginResponse({ accessToken });
  }
}
