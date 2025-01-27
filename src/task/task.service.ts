import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { getUniqueLabelNames } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './entity/task.dto';
import { Task } from './entity/task.entity';
import { GetTasksParams } from './entity/task.params';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  public async getAll(filters?: GetTasksParams): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        status: filters?.status,
      },
      relations: ['labels'],
    });
  }

  public async getById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['labels'],
    });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  public async create(data: CreateTaskDto): Promise<Task> {
    if (data.labels) {
      data.labels = getUniqueLabelNames(data.labels);
    }

    const task = {
      id: randomUUID(),
      ...data,
    };

    return this.taskRepository.save(task);
  }

  public async updateById(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    const newTask = this.taskRepository.merge(task, data);

    return this.taskRepository.save(newTask);
  }

  public async deleteById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return this.taskRepository.remove(task);
  }
}
