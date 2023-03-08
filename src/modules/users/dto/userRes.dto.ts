import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({ description: 'User id', nullable: false })
  readonly id: number;

  @ApiProperty({ description: 'User name', nullable: false })
  readonly name: string;

  @ApiProperty({ description: 'User email', nullable: false })
  readonly email: string;
}

export class UserResDto {
  @ApiProperty({ description: 'User data', nullable: false })
  readonly user: UserInfo;

  @ApiProperty({ description: 'User token', nullable: false })
  readonly token: string;
}
