import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';

@Injectable()
export class AuthService {
constructor(
  @InjectRepository(User)
  private usersRepository : Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = this.usersRepository.create({
      username,
      password
    });
    
    try {
    await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }
}
