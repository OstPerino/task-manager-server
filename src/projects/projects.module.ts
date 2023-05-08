import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { User } from '../users/users.model';
import { UsersProjects } from './user-projects.model';
import { UsersModule } from '../users/users.module';
import {Board} from "../board/board.model";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtService],
  imports: [
    SequelizeModule.forFeature([Project, User, UsersProjects, Board]),
    UsersModule,
  ],
})
export class ProjectsModule {}
