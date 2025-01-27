import { Body, Controller, Param, Post } from '@nestjs/common';
import { Task } from 'src/task/entity/task.entity';
import { CreateTaskLabelDto } from './entity/task-label.dto';
import { TaskLabelService } from './task-label.service';

@Controller('labels')
export class TaskLabelController {
  constructor(private readonly taskLabelService: TaskLabelService) {}

  @Post('/:taskId')
  public async addLabelsToTask(
    @Param('taskId') taskId: string,
    @Body() body: { labels: CreateTaskLabelDto[] },
  ): Promise<Task> {
    return this.taskLabelService.addLabelsToTask(taskId, body.labels);
  }
}
