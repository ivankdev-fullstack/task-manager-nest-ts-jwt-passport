import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskLabelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}

export class DeleteTaskLabelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
