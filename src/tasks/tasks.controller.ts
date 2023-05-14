import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  async getTasksForBoard(@Param('id') id: string) {
    return this.tasksService.getTasksForBoard(+id);
  }

  @Patch(':id')
  async editTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    return this.tasksService.editTaskStatus(updateTaskDto, +id);
  }
}
