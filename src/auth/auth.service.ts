import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPass } from 'src/utils/utils';
import { CreateUserDto } from '../user/entity/user.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPassValid = await verifyPass(password, user.password);
    if (!isPassValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  public async register(data: CreateUserDto): Promise<User> {
    const isExist = await this.userService.getByEmail(data.email);
    if (isExist) {
      throw new ConflictException('Email already exists');
    }

    return this.userService.create(data);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, name: user.name };
    return this.jwtService.sign(payload);
  }
}
