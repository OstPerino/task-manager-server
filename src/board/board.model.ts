import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Project} from "../projects/projects.model";

@Table({tableName: 'boards'})
export class Board extends Model<Board> {
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

    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER, field: 'projectId'})
    projectId: number;

    @BelongsTo(() => Project)
    project: Project;
}