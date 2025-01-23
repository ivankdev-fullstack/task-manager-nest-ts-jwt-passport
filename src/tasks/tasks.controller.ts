import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './entity/tasks.dto';
import { TasksService } from './tasks.service';
import { ITask } from './entity/tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getAll(): ITask[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string): ITask {
    const task = this.tasksService.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  @Post()
  public create(@Body() body: CreateTaskDto): ITask {
    return this.tasksService.create(body);
  }

  @Patch('/:id')
  public updateById(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ): ITask {
    const task = this.tasksService.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return this.tasksService.updateById(id, body);
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: string): string {
    const task = this.tasksService.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return this.tasksService.deleteById(id);
  }
}
