import {Body, Controller, Get, Post, Headers, Param} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ApiTags} from '@nestjs/swagger';
import {CreateProjectDto} from './dto/create-project.dto';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {InviteUserDto} from "./dto/invite-user.dto";

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

  @Post("/invite")
  inviteUserToProject(@Body() inviteUserDto: InviteUserDto) {
    return this.projectsService.inviteUser(inviteUserDto);
  }

  @Get('current-project/:id')
  async getCurrentBoard(@Param('id') id: string) {
    return this.projectsService.getCurrentProject(+id);
  }
}
