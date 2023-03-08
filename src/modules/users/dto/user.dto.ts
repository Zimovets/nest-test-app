import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @MinLength(6)
  readonly password: string;
}
