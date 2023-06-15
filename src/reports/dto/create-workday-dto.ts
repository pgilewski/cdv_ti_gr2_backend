import { IsNumber, IsDate } from 'class-validator';

export class CreateWorkDayDto {
  @IsNumber()
  userId!: string;

  @IsDate()
  date!: string;
}
