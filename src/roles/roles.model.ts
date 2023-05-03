import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({
    example: '1',
    description: 'id роли',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'admin',
    description: 'роль',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'администратор',
    description: 'описание роли',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
