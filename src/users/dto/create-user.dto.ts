import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'электронная почта пользователя',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО/ФИ пользователя',
  })
  readonly name: string;

  @ApiProperty({
    example: 'password1234',
    description: 'пароль пользователя',
  })
  password: string;
}
