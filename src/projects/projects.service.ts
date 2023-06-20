import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Project} from './projects.model';
import {CreateProjectDto} from './dto/create-project.dto';
import {UsersService} from '../users/users.service';
import {UsersProjects} from './user-projects.model';
import {InviteUserDto} from "./dto/invite-user.dto";

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

    if (!user.id) {
      throw new HttpException('Такого пользователя не существует', HttpStatus.BAD_REQUEST);
    }

    await this.usersProjects.create({
      userId: user.id,
      projectId: project.id,
      role: 'owner',
    });

    await project.$set('users', [user.id]);
    return project;
  }

  // TODO: Invite user to project
  async inviteUser(inviteUserDto: InviteUserDto) {
    const user = await this.usersService.getUserByEmail(inviteUserDto.email);
    const project = await this.projectRepository.findOne({where:{id: inviteUserDto.projectId}});
    console.log('invite');

    // await this.usersProjects.create({
    //   userId: user.id,
    //   projectId: project.id,
    //   role: 'invited'
    // });

    await project.$add('users', [user.id]);
  }

  async getProjectsForUser(token: string) {
    const decoded = await this.usersService.decode(token);
    const usersProjects = await this.usersProjects.findAll({where: {userId: decoded.id}, include: {all: true}});
    const projectIds = usersProjects.map(project => project.projectId);
    const projects = await this.projectRepository.findAll({where: {id: projectIds}, include: {all: true}});
    return projects;
  }

  async getCurrentProject(id: number) {
    return this.projectRepository.findOne({where: {id}});
  }
}
