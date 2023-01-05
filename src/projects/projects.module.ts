import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { User } from '../users/users.model';
import { UsersProjects } from './user-projects.model';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Project, User, UsersProjects])],
})
export class ProjectsModule {}
