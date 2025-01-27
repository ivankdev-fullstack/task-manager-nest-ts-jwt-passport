import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entity/task.entity';
import { TaskService } from 'src/task/task.service';
import { Repository } from 'typeorm';
import { CreateTaskLabelDto } from './entity/task-label.dto';
import { TaskLabel } from './entity/task-label.entity';

@Injectable()
export class TaskLabelService {
  constructor(
    @InjectRepository(TaskLabel)
    private readonly labelsRepository: Repository<TaskLabel>,
    private readonly taskService: TaskService,
  ) {}

  public async addLabelsToTask(
    taskId: string,
    data: CreateTaskLabelDto[],
  ): Promise<Task> {
    const task = await this.taskService.getById(taskId);
    const labels = data.map((label) => this.labelsRepository.create(label));

    task.labels = [...task.labels, ...labels];

    return await this.taskService.updateById(taskId, task);
  }
}
