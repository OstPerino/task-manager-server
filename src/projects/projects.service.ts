import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Project} from './projects.model';
import {CreateProjectDto} from './dto/create-project.dto';
import {UsersService} from '../users/users.service';
import {UsersProjects} from './user-projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    @InjectModel(UsersProjects) private usersProjects: typeof UsersProjects,
    private usersService: UsersService,
  ) {
  }

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.projectRepository.create(createProjectDto);
    const user = await this.usersService.getUserByEmail(createProjectDto.email);

    await this.usersProjects.create({
      userId: user.id,
      projectId: project.id,
      role: 'owner',
    });

    if (!user.id) {
      throw new HttpException('Пользователь с таким email не зарегестрирован', HttpStatus.BAD_REQUEST);
    }

    await project.$set('users', [user.id]);
    return project;
  }

  async getProjectsForUser(token: string) {
    console.log(token)
    const decoded = await this.usersService.decode(token);
    const usersProjects = await this.usersProjects.findAll({where: { userId: decoded.id }, include: {all: true}});
    const projectIds = usersProjects.map(project => project.projectId);
    const projects = await this.projectRepository.findAll({ where: { id: projectIds }, include: {all: true}});
    return projects;
  }

  // TODO: Сервис по добавлению пользователя на проект
  // async inviteUser() {
  //
  // }

  // async getAll() {
  //   const projects = await this.projectRepository.findAll({include: {all: true}});
  //   return projects;
  // }
  //
  // async getOne(id: number) {
  //   const project = await this.projectRepository.findOne({where: {id}});
  //   return project;
  // }
}
