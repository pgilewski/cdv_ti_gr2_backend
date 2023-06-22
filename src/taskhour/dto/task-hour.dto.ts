import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTaskHourDto {
  @IsNumber()
  taskId!: number;

  @IsNumber()
  workDayId!: number;

  @IsNumber()
  userId!: number;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsNumber()
  duration!: number;

  @IsString()
  @IsOptional()
  note?: string;
}

export class UpdateTaskHourDto {
  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;
}
