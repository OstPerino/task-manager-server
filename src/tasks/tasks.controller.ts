import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {CreateTaskDto} from "./dto/create-task.dto";

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
}
