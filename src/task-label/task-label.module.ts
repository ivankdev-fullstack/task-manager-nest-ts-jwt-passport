import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entity/task.entity';
import { TaskService } from 'src/task/task.service';
import { TaskLabel } from './entity/task-label.entity';
import { TaskLabelController } from './task-label.controller';
import { TaskLabelService } from './task-label.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLabel, Task])],
  controllers: [TaskLabelController],
  providers: [TaskLabelService, TaskService],
})
export class TaskLabelModule {}
