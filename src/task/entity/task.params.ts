import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task.types';

export class GetTasksParams {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
