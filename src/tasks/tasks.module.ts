import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Board} from "../board/board.model";
import {Task} from "./tasks.model";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Board, Task])]
})
export class TasksModule {}
