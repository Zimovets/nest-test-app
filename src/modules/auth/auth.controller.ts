import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './authService';
import { UserDto } from '../users/dto/user.dto';
import { LogInDto } from '../users/dto/logIn.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResDto } from '../users/dto/userRes.dto';
import { ExceptionResponse } from 'src/core/exceptions/dto/exceptionResponse';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: UserResDto,
    status: 201,
    description: 'User login success',
  })
  @ApiResponse({
    type: ExceptionResponse,
    status: 401,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LogInDto) {
    return await this.authService.login(user);
  }

  @ApiResponse({
    type: UserResDto,
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    type: ExceptionResponse,
    status: 400,
  })
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
