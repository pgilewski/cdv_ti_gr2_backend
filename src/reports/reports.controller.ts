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
    console.log(day, userId);
    // return user;
    return await this.reportsService.getWorkDay(day, userId);
  }

  @Get('monthly')
  async getMonthlyReport(
    @Query('date') date: string | undefined,
    @Query('user') user: string | undefined,
    @Req() req: any,
  ) {
    const userId = user || req.user.id;
    console.log(user, req);
    return await this.reportsService.getWorkDay(date, userId);
  }

  @Roles(Role.Moderator)
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
  //   console.log(activeUser);
  //   return this.reportsService.findAll();
  // }
}
