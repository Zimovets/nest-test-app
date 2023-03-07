import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(6)
  readonly password: string;
}
