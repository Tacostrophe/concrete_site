import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface JobTitleCreationAttrs {
  title: string;
}

@Table({
  tableName: 'job_titles',
  timestamps: false,
})
export class JobTitle extends Model<JobTitle, JobTitleCreationAttrs> {
  @ApiProperty({
    example: '1',
    description: 'id должности',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'инженер',
    description: 'должность',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;
}
