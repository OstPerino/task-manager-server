import {
    BelongsToMany,
    Column,
    DataType, HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../users/users.model';
import {UsersProjects} from './user-projects.model';
import {Board} from "../board/board.model";

interface ProjectsCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'projects'})
export class Project extends Model<Project, ProjectsCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентефикатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({example: 'Project Name', description: 'Название проекта'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: 'Project Description',
        description: 'Описание проекта',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @ApiProperty({
        example: 'https://github.com/OstPerino/task-manager-server',
        description: 'Ссылка на репозиторий проекта',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gitRepositoryURL: string;

    @BelongsToMany(() => User, () => UsersProjects)
    users: User[];

    @HasMany(() => Board)
    board: Board[];
}
