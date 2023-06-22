// task-hour.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { differenceInMinutes, parseISO } from 'date-fns';
import { CreateTaskHourDto } from './dto/task-hour.dto';

@Injectable()
export class TaskHourService {
  constructor(private prisma: PrismaService) {}

  async addTaskHourToWorkDay(data: CreateTaskHourDto): Promise<any> {
    const task = await this.prisma.task.findUnique({
      where: { id: data.taskId },
    });
    const workDay = await this.prisma.workDay.findUnique({
      where: { id: data.workDayId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${data.taskId} not found`);
    }

    if (!workDay) {
      throw new NotFoundException(
        `WorkDay with ID ${data.workDayId} not found`,
      );
    }

    const startTime = parseISO(data.startTime);
    const endTime = parseISO(data.endTime);
    const duration = differenceInMinutes(endTime, startTime);

    const taskHour = await this.prisma.taskHour.create({
      data: {
        startTime,
        endTime,
        note: data.note,
        duration,
        task: { connect: { id: task.id } },
        workDay: { connect: { id: workDay.id } },
        user: { connect: { id: data.userId } },
      },
    });

    return taskHour;
  }

  async deleteTaskHour(id: string): Promise<any> {
    const taskHour = await this.prisma.taskHour.findUnique({
      where: { id: +id },
    });

    if (!taskHour) {
      throw new NotFoundException(`Task hour with ID ${id} not found`);
    }

    await this.prisma.taskHour.delete({
      where: { id: +id },
    });

    return { message: 'Task hour deleted successfully' };
  }
}
