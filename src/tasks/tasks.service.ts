import {Injectable} from '@nestjs/common';
import {Task} from "./tasks.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto);
  }

  async getTasksForBoard(boardId: number) {
    return this.taskRepository.findAll({ where:{boardId:boardId} })
  }
}
