import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './users.model';
import {Project} from '../projects/projects.model';
import {UsersProjects} from '../projects/user-projects.model';
import {JwtService} from "@nestjs/jwt";
import {Board} from "../board/board.model";
import {UsersBoards} from "../board/user-boards.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  imports: [SequelizeModule.forFeature([User, Project, UsersProjects, Board, UsersBoards])],
  exports: [UsersService],
})
export class UsersModule {
}
