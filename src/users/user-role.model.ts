import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';

@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model<UserRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
