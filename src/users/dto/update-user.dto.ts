import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsEnum(Role, { each: true })
  role?: Role;

  permissions?: string[];
}
