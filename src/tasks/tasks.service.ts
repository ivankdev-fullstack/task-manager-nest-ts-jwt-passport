import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto, UpdateTaskDto } from './entity/tasks.dto';
import { ITask } from './entity/tasks.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public getAll(): ITask[] {
    return this.tasks;
  }

  public getById(id: string): ITask | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  public create(data: CreateTaskDto): ITask {
    const task = {
      id: randomUUID(),
      ...data,
    };

    this.tasks.push(task);
    return task;
  }

  public updateById(id: string, data: UpdateTaskDto): ITask {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    const updatedTask = { ...this.tasks[taskIndex], ...data };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  public deleteById(id: string): string {
    this.tasks = this.tasks.filter((t) => t.id !== id);

    return 'Task has been deleted.';
  }
}
