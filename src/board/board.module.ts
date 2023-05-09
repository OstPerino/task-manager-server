import {Module} from '@nestjs/common';
import {BoardService} from './board.service';
import {BoardController} from './board.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "../projects/projects.model";
import {Board} from "./board.model";
import {User} from "../users/users.model";
import {UsersBoards} from "./user-boards.model";
import {UsersModule} from "../users/users.module";
import {Task} from "../tasks/tasks.model";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    SequelizeModule.forFeature([Board, Project, User, UsersBoards, Task]),
    UsersModule,
  ]
})
export class BoardModule {
}
