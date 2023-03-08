import { ApiProperty } from '@nestjs/swagger';

export class LogInResDto {
  @ApiProperty({ description: 'User token', nullable: false })
  readonly token: string;
}
