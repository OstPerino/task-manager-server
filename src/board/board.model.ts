import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Project} from "../projects/projects.model";
import {User} from "../users/users.model";
import {UsersBoards} from "./user-boards.model";
import {Task} from "../tasks/tasks.model";

interface BoardAttrs {
  projectId: number;
  name: string;
  description: string;
}

@Table({tableName: 'boards'})
export class Board extends Model<Board, BoardAttrs> {
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
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  githubURL: string;

  @ForeignKey(() => Project)
  @Column({type: DataType.INTEGER, field: 'projectId'})
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsToMany(() => User, () => UsersBoards)
  users: User[];

  @HasMany(() => Task)
  tasks: Task[];
}