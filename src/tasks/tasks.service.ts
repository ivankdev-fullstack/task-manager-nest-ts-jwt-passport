import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto, UpdateTaskDto } from './entity/tasks.dto';
import { ITask } from './entity/tasks.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public getAll() {
    return this.tasks;
  }

  public getOneById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  public updateOneById(id: string, data: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    const updatedTask = { ...this.tasks[taskIndex], ...data };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  public create(data: CreateTaskDto): ITask {
    const task = {
      id: randomUUID(),
      ...data,
    };

    this.tasks.push(task);
    return task;
  }
}
