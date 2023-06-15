// project.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(Number(id));
  }

  @Post()
  createProject(@Body() data: CreateProjectDto) {
    return this.projectService.createProject(data);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() data: UpdateProjectDto) {
    return this.projectService.updateProject(Number(id), data);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(Number(id));
  }
}
