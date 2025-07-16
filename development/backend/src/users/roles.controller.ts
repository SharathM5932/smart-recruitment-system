import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async createRole() {
    const roles = await this.roleService.getAllRoles();

    return {
      statusCode: '200',
      message: 'All roles are retrieves successfully',
      data: roles,
    };
  }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }
}