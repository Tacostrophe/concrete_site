import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'роль',
  })
  readonly value: string;

  @ApiProperty({
    example: 'администратор',
    description: 'описание роли',
  })
  readonly description: string;
}
