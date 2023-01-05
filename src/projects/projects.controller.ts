import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.getAll();
  }

  @Get('/:id')
  getOneProject(@Param('id') id: number) {
    return this.projectsService.getOne(id);
  }

  @Post()
  createNewProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
  //   TODO: Сделать добавление новых пользователей на проект
  //   TODO: Сделать удаление пользователей с проекта
  //   TODO: Сделать права пользователей на проекте
}
