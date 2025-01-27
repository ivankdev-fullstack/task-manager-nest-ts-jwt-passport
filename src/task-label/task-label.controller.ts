import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Task } from 'src/task/entity/task.entity';
import {
  CreateTaskLabelDto,
  DeleteTaskLabelDto,
} from './entity/task-label.dto';
import { TaskLabelService } from './task-label.service';

@Controller('labels')
export class TaskLabelController {
  constructor(private readonly taskLabelService: TaskLabelService) {}

  @Post('/:taskId')
  public async addToTask(
    @Param('taskId') taskId: string,
    @Body() body: { labels: CreateTaskLabelDto[] },
  ): Promise<Task> {
    return this.taskLabelService.addToTask(taskId, body.labels);
  }

  @Delete('/:taskId')
  public async removeByTaskId(
    @Param('taskId') taskId: string,
    @Body() body: { labels: string[] },
  ): Promise<Task> {
    return this.taskLabelService.removeByTaskId(taskId, body.labels);
  }
}
