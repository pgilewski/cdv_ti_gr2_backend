import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, role, permissions } =
      createUserDto;
    return await this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, password, firstName, lastName, role, permissions } =
      updateUserDto;
    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
        firstName,
        lastName,
        role,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
