import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPass } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './entity/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPass(data.password);

    return await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
  }
}
