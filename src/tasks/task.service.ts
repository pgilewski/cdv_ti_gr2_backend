// task.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(data: CreateTaskDto) {
    return this.prisma.task.create({ data });
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }

  async getTasksByUserId(userId: number) {
    const x = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userTasks: {
          select: {
            task: {
              select: {
                name: true,
                description: true,
                project: {
                  // Get the project details for standalone tasks
                  select: {
                    title: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
        userProjects: {
          // Get the tasks assigned to the user through a project
          select: {
            project: {
              select: {
                title: true,
                description: true,
                tasks: {
                  select: {
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return x;
  }
}
