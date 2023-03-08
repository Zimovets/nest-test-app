import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.create(userDto);
  }
}
