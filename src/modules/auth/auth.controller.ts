import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './authService';
import { UserDto } from '../users/dto/user.dto';
import { LogInDto } from '../users/dto/logIn.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResDto } from '../users/dto/userRes.dto';
import { ExceptionResponse } from 'src/core/exceptions/dto/exceptionResponse';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh.jwt.guard';
import { RefreshDto } from './dto/refresh.dto';

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
  @UseGuards(LocalAuthGuard)
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

  @ApiResponse({
    type: RefreshDto,
    status: 201,
    description:
      'Refresh token successfully, work only with refresh token in Authorization header',
  })
  @ApiResponse({
    type: ExceptionResponse,
    status: 400,
  })
  @ApiBearerAuth()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: any) {
    return await this.authService.generateToken(req.user);
  }
}
