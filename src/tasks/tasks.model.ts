import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Board} from "../board/board.model";


interface TaskCreationAttrs {
  title: string;
  description: string;
  status: string;
  creatorId: number;
}

@Table({tableName: "Tasks"})
export class Task extends Model<Task, TaskCreationAttrs> {
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
  title: string;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'creatorId'})
  creatorId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'workerId', allowNull: true})
  workerId: number;

  @ForeignKey(() => Board)
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;
}