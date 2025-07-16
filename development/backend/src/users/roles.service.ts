import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async getAllRoles() {
    const roles = await this.roleRepo.find({
      select: ['id', 'name'],
    });

    if (roles.length === 0) {
      throw new BadRequestException('No roles found.');
    }

    return roles;
  }

   async create(dto: CreateRoleDto) {
    if (!dto.name) {
      throw new BadRequestException('Role name is required');
    }

    const exists = await this.roleRepo.findOneBy({ name: dto.name });
    if (exists) {
      throw new BadRequestException('Role already exists');
    }

    const role = this.roleRepo.create(dto);
    return this.roleRepo.save(role);
  }
}