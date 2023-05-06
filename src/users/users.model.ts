import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRole } from './user-role.model';

interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: '1',
    description: 'id пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user@mail.ru',
    description: 'электронная почта пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО/ФИ пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'password1234',
    description: 'пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  // @ApiProperty({
  //   exampple: '',
  //   description: 'роли пользовтеля',
  // })
  // @Column({
  //   type:
  // })
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
