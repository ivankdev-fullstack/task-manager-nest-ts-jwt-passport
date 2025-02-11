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
import { CurrentUserId } from 'src/user/decorators/current-user-id.decorator';
import { CreateTaskDto, UpdateTaskDto } from './entity/task.dto';
import { Task } from './entity/task.entity';
import {
  PaginationParams,
  PaginationResponse,
  TasksFilterParams,
  TasksSortParams,
} from './entity/task.params';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  public async getAll(
    @CurrentUserId() userId: string,
    @Query() filters: TasksFilterParams,
    @Query() pagination: PaginationParams,
    @Query() sort: TasksSortParams,
  ): Promise<PaginationResponse<Task>> {
    const [items, total] = await this.tasksService.getAll(
      userId,
      filters,
      pagination,
      sort,
    );

    return {
      data: items,
      meta: {
        total,
        ...pagination,
      },
    };
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: string,
    @CurrentUserId() userId: string,
  ): Promise<Task> {
    return this.tasksService.getById(id, userId);
  }

  @Post()
  public async create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUserId() userId: string,
  ): Promise<Task> {
    return await this.tasksService.create({
      ...createTaskDto,
      userId,
    });
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
