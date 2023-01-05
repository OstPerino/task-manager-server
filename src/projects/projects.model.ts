import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ProjectsCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'projects' })
export class Projects extends Model<Projects, ProjectsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gitRepositoryURL: string;
}
