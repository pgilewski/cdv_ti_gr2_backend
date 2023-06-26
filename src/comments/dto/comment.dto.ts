import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  workDayId!: number;

  @IsNumber()
  userId!: number;

  @IsString()
  content!: string;

  @IsString()
  type!: string;
}
