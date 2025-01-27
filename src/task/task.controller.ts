import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './entity/task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { GetTasksParams } from './entity/task.params';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  public async getAll(@Query() filters: GetTasksParams): Promise<Task[]> {
    return this.tasksService.getAll(filters);
  }

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  public async create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(body);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateById(id, body);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteById(id);
  }
}
