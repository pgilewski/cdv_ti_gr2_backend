// task-hour.controller.ts
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateTaskHourDto } from './dto/task-hour.dto';
import { TaskHourService } from './task-hour.service';

@Controller('task-hour')
export class TaskHourController {
  constructor(private readonly taskHourService: TaskHourService) {}

  @Post('/add')
  async addTaskHourToWorkDay(@Body() createTaskHourDto: CreateTaskHourDto) {
    return this.taskHourService.addTaskHourToWorkDay(createTaskHourDto);
  }

  @Delete('/:id')
  async deleteTaskHour(@Param('id') id: string) {
    return this.taskHourService.deleteTaskHour(id);
  }
}
