import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateWorkDayDto } from './dto/create-workday-dto';
// import { UpdateTaskHourDto } from './dto/update-taskhour-dto';
// import { UpdateWorkDayDto } from './dto/update-workday-dto';
import { Prisma } from '@prisma/client';
import { UpdateWorkDayDto } from './dto/update-workday-dto';
import { WorkDay } from 'src/types';
import { CreateTaskHourDto } from 'src/taskhour/dto/task-hour.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkDay(day?: string, userId?: number): Promise<any> {
    const whereClause: Prisma.WorkDayWhereInput = {};

    if (day) {
      whereClause.date = day;
    }

    if (userId) {
      whereClause.userId = Number(userId);
    }

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
        comments: {
          select: {
            id: true,
            createdAt: true,
            content: true,
            type: true,
            user: true,
          },
        },
        user: true,
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
  async getMonthly(month?: string, userId?: number): Promise<WorkDay[]> {
    const whereClause: Prisma.WorkDayWhereInput = {};

    if (month) {
      const startDate = new Date(`${month}-01T00:00:00.000Z`); // beginning of the month
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1); // move to the next month
      whereClause.date = {
        gte: startDate.toISOString().substring(0, 10), // format as YYYY-MM-DD
        lt: endDate.toISOString().substring(0, 10), // format as YYYY-MM-DD
      };
    }

    if (userId) {
      whereClause.userId = Number(userId);
    }

    return this.prisma.workDay.findMany({
      where: whereClause,
      orderBy: {
        date: 'asc',
      },
      include: {
        taskHours: {
          include: {
            task: true,
          },
        },
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
