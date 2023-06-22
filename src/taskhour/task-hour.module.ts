import { Module } from '@nestjs/common';

import { TaskHourService } from './task-hour.service';
import { TaskHourController } from './task-hour.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TaskHourController],
  providers: [TaskHourService, PrismaService],
})
export class TaskHourModule {}
