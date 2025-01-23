import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from './tasks.model';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
