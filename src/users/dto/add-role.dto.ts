import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: '1',
    description: 'id пользователя',
  })
  readonly userId: number;

  @ApiProperty({
    example: 'admin',
    description: 'роль',
  })
  readonly value: string;
}
