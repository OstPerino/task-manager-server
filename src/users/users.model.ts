import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany, HasMany,
} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {Project} from '../projects/projects.model';
import {UsersProjects} from '../projects/user-projects.model';
import {Notification} from "../notifications/notifications.model";
import {UsersBoards} from "../board/user-boards.model";
import {Board} from "../board/board.model";

interface UserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Уникальный идентефикатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({example: 'David', description: 'Имя пользователя'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({example: 'Miller', description: 'Фамилия пользователя'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Email пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Project, () => UsersProjects)
  users: User[];

  @BelongsToMany(() => Board, () => UsersBoards)
  boards: Board[];

  @HasMany(() => Notification)
  notifications: Notification[];
}
