import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {User} from '../users/users.model';
import {Board} from './board.model';

@Table({tableName: 'users-boards', createdAt: false, updatedAt: false})
export class UsersBoards extends Model<UsersBoards> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @ForeignKey(() => Board)
  @Column({type: DataType.INTEGER})
  boardId: number;
}
