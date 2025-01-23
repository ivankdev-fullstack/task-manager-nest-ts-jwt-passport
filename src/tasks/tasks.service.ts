import { Injectable } from '@nestjs/common';
import { ITask } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public getAll() {
    return this.tasks;
  }

  public getOneById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }
}
