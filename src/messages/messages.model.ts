import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Chat} from "../chats/chats.model";

interface MessageCreationAttrs {
}

@Table({tableName: "Message"})
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  senderName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  time: string;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => Chat)
  chatId: number;
}