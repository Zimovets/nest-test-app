import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './authService';
import { UserDto } from '../users/dto/user.dto';
import { LogInDto } from '../users/dto/logInDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogInResDto } from '../users/dto/logInResDto';
import { LogInException } from 'src/core/exceptions/dto/logInException';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: LogInResDto,
    status: 201,
    description: 'User login success',
  })
  @ApiResponse({
    type: LogInException,
    status: 401,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LogInDto) {
    return await this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
