import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Message} from "../messages/messages.model"
import {User} from "../users/users.model";

interface TaskCreationAttrs {
}

@Table({tableName: "Chats"})
export class Chat extends Model<Chat, TaskCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  firstUserId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  secondUserId: number;

  @HasMany(() => Message)
  messages: Message[];
}