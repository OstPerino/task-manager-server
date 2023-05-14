import {Injectable} from '@nestjs/common';
import {Task} from "./tasks.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto);
  }

  async getTasksForBoard(boardId: number) {
    return this.taskRepository.findAll({ where:{boardId:boardId} })
  }

  async editTaskStatus(updateTaskDto: UpdateTaskDto, id: number) {
    const task = await this.taskRepository.findByPk(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    task.status = updateTaskDto.status;
    await task.save();
    return task;
  }
}
