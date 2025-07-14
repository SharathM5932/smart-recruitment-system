import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

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
}
