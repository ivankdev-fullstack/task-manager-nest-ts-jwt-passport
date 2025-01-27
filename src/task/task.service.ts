import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateTaskLabelDto } from 'src/task-label/entity/task-label.dto';
import { TaskLabelService } from 'src/task-label/task-label.service';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './entity/task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskLabelService: TaskLabelService,
  ) {}

  public async getAll(): Promise<Task[]> {
    return this.taskRepository.find();
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
      data.labels = await this.getUniqueLabelNames(data.labels);
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

  private async getUniqueLabelNames(
    labels: CreateTaskLabelDto[],
  ): Promise<CreateTaskLabelDto[]> {
    const uniqueNames = [...new Set(labels.map((label) => label.name))];
    return uniqueNames.map((name) => ({ name }));
  }
}
