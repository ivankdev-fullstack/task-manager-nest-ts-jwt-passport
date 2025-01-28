import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entity/user.dto';
import { User } from './entity/user.entity';
import { PasswordService } from './password/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  public async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(data.password);

    return await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
  }
}
