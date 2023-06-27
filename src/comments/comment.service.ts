// task-hour.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { differenceInMinutes, parseISO } from 'date-fns';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async addCommentToWorkDay(data: CreateCommentDto): Promise<any> {
    const workDay = await this.prisma.workDay.findUnique({
      where: { id: data.workDayId },
    });

    if (!workDay) {
      throw new NotFoundException(
        `WorkDay with ID ${data.workDayId} not found`,
      );
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: data.content,
        type: data.type,
        workday: {
          connect: { id: data.workDayId },
        },
        user: {
          connect: { id: data.userId },
        },
      },
    });

    return comment;
  }

  async deleteComment(id: string): Promise<any> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: +id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.prisma.comment.delete({
      where: { id: +id },
    });

    return { message: 'Comment deleted successfully' };
  }
}
