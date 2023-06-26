import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { PrismaService } from '../prisma/prisma.service';

import { ReportsService } from './reports.service';
import { CreateWorkDayDto } from './dto/create-workday-dto';
import { UpdateWorkDayDto } from './dto/update-workday-dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('daily')
  async getDailyReport(
    @Query('day') day: string | undefined,
    @Query('userId') user: string | undefined,
    @Req() req: any,
  ) {
    // jezeli zostanie podany user to zwracamy jego raporty jak nie to zwracamy raporty zalogowanego usera
    const userId = user || req.user.id;
    // return user;
    return await this.reportsService.getWorkDay(day, userId);
  }

  // /reports/monthly?date=2021-05&user=1
  @Get('monthly')
  async getMonthlyReport(
    @Query('month') month: string | undefined,
    @Query('userId') user: string | undefined,
    @Req() req: any,
  ) {
    const userId = user || req.user.id;
    const workDays = await this.reportsService.getMonthly(month, userId);
    const workDaysCount = workDays.length;

    let totalMinutes = 0;
    let workDaysReviewedCount = 0;

    for (const workDay of workDays) {
      if (workDay.isReviewed) {
        workDaysReviewedCount++;
      }
      for (const taskHour of workDay.taskHours || []) {
        totalMinutes += taskHour.duration || 0;
      }
    }

    return { workDays, workDaysCount, totalMinutes, workDaysReviewedCount };
  }

  @Post('daily')
  create(@Body() createWorkDayData: CreateWorkDayDto) {
    return this.reportsService.createWorkDay(createWorkDayData);
  }

  @Roles(Role.Moderator, Role.Administrator)
  @Patch('daily/:id')
  update(@Param('id') id: string, @Body() updateWorkDayData: UpdateWorkDayDto) {
    return this.reportsService.updateWorkDay(+id, updateWorkDayData);
  }

  // @Roles(Role.Administrator)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportsService.remove(+id);
  // }

  // @Get()
  // findAll(@ActiveUser() activeUser: ActiveUserData) {
  //   return this.reportsService.findAll();
  // }
}
