import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getAll() {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  public getOneById(@Param('id') id: string) {
    const task = this.tasksService.getOneById(id);

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }
}
