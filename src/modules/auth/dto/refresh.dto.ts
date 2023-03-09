import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  @ApiProperty({ description: 'Token', nullable: false })
  readonly token: string;

  @IsString()
  @ApiProperty({ description: 'Refresh token', nullable: false })
  readonly refreshToken: string;
}
