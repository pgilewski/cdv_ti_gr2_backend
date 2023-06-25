import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';
import { ProjectModule } from './projects/project.module';

import { ReportsModule } from './reports/reports.module';
import { ResourcesModule } from './resources/resources.module';
import { TaskHourModule } from './taskhour/task-hour.module';
import { TaskModule } from './tasks/task.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ResourcesModule,
    ReportsModule,
    UsersModule,
    IamModule,
    ProjectModule,
    TaskModule,
    TaskHourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
