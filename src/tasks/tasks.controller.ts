import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './entity/tasks.dto';
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

  @Patch('/:id')
  public updateOneById(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const task = this.tasksService.getOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    console.log(body);

    return this.tasksService.updateOneById(id, body);
  }

  @Post()
  public create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }
}
