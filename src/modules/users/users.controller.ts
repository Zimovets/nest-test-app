import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UsersService) {}
  // @Post()
  // async create(@Body() userDto: UserDto): Promise<User> {
  //   return await this.userService.create(userDto);
  // }
  @Post()
  async create(): Promise<string> {
    return 'HEllo world';
  }
}
