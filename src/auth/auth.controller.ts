import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<User> {
    return this.authService.createUser(authCredentialsDto);
  }
}
