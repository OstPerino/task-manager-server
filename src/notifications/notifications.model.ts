import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

@Table({tableName: "notifications"})
export class Notification extends Model<Notification> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'userId'})
  userId: number;

  @BelongsTo(() => User)
  user: User;
}