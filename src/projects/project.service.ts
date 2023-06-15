// project.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects() {
    return this.prisma.project.findMany();
  }

  async getProjectById(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async createProject(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  async updateProject(id: number, data: UpdateProjectDto) {
    return this.prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
