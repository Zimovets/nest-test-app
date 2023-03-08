import { ApiProperty } from '@nestjs/swagger';

export class LogInException {
  @ApiProperty({ description: 'Response status', nullable: false })
  readonly status: string;

  @ApiProperty({ description: 'Exception time timestamp', nullable: false })
  readonly timestamp: string;

  @ApiProperty({ description: 'Request path', nullable: false })
  readonly path: string;

  @ApiProperty({
    description: 'Exception message, string or object',
    nullable: false,
  })
  readonly message: any;
}
