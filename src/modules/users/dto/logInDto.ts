import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LogInDto {
  @IsEmail()
  @ApiProperty({ description: 'User email', nullable: false })
  readonly username: string;

  @MinLength(6)
  @ApiProperty({ description: 'User password', nullable: false })
  readonly password: string;
}
