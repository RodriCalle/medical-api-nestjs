import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_REPOSITORY } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async findOneByName(name: string) {
    const role = await this.roleRepository.findOne({
      where: { name: name },
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    return await this.roleRepository.remove(role);
  }
}
