import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskHourDto } from '../taskhour/dto/task-hour.dto';
import { CreateWorkDayDto } from './dto/create-workday-dto';
// import { UpdateTaskHourDto } from './dto/update-taskhour-dto';
// import { UpdateWorkDayDto } from './dto/update-workday-dto';
import { Prisma, WorkDay } from '@prisma/client';
import { UpdateWorkDayDto } from './dto/update-workday-dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkDay(day?: string, userId?: number): Promise<WorkDay> {
    const whereClause: Prisma.WorkDayWhereInput = {};

    if (day) {
      whereClause.date = day;
    }

    if (userId) {
      whereClause.userId = Number(userId);
    }
    console.log(whereClause);

    return this.prisma.workDay.findFirst({
      where: whereClause,
      include: {
        taskHours: {
          include: {
            task: {
              include: {
                project: {
                  select: {
                    title: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
        comments: true,
      },
    });
  }

  async createWorkDay(data: CreateWorkDayDto) {
    const workDay = { ...data, isReviewed: false, reviewedBy: undefined };
    return await this.prisma.workDay.create({
      data: { ...workDay, userId: Number(data.userId) },
    });
  }

  async updateWorkDay(id: number, data: UpdateWorkDayDto) {
    return await this.prisma.workDay.update({
      where: { id },
      data,
    });
  }

  async createTaskHour(data: CreateTaskHourDto) {
    return await this.prisma.taskHour.create({ data });
  }
  async addTaskHourToWorkDay(
    userId: number,
    workDayId: number,
    taskHourData: any,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const workDay = await this.prisma.workDay.findUnique({
      where: { id: workDayId },
    });

    if (!workDay) {
      throw new Error('WorkDay not found');
    }

    return this.prisma.taskHour.create({
      data: {
        ...taskHourData,
        userId: user.id,
        workDayId: workDay.id,
      },
    });
  }

  // async updateTaskHour(id: number, data: UpdateTaskHourDto) {
  //   return await this.prisma.taskHour.update({
  //     where: { id },
  //     data,
  //   });
  // }
}
