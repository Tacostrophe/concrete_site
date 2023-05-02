import { ApiProperty } from '@nestjs/swagger';

export class CreateJobTitleDto {
  @ApiProperty({
    example: 'инженер',
    description: 'должность',
  })
  readonly title: string;
}
