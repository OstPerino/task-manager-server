import {Body, Controller, Get, Post, Headers} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ApiTags} from '@nestjs/swagger';
import {CreateProjectDto} from './dto/create-project.dto';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService,
              private usersService: UsersService,
              private jwtService: JwtService) {
  }

  @Get()
  getProjectsForUser(@Headers('authorization') token) {
    return this.projectsService.getProjectsForUser(token);
  }

  @Post()
  createNewProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
