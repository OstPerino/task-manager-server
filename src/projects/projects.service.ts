import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { CreateProjectDto } from './dto/create-project.dto';
import { UsersService } from '../users/users.service';
import { UsersProjects } from './user-projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    @InjectModel(UsersProjects) private usersProjects: typeof UsersProjects,
    private usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    const user = await this.usersService.getUserByEmail(createProjectDto.email);
    await this.usersProjects.create({
      userId: user.id,
      projectId: project.id,
      role: 'owner',
    });
    // await project.$set('users', [user.id]);
    // await project.$add('role', 'owner');
    return project;
  }

  async getAll() {
    const projects = await this.projectRepository.findAll();
    return projects;
  }

  async getOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    return project;
  }
}
