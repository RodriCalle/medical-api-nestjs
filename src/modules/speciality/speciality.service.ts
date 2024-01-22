import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SPECIALITY_REPOSITORY } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Speciality } from 'src/entities/speciality.entity';

@Injectable()
export class SpecialityService {
  constructor(
    @Inject(SPECIALITY_REPOSITORY)
    private readonly specialityRepository: Repository<Speciality>,
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto) {
    const specialityEntity = plainToClass(Speciality, createSpecialityDto);
    return this.specialityRepository.save(specialityEntity);
  }

  async findAll() {
    return await this.specialityRepository.find({
      relations: ['doctors'],
    });
  }

  async findOne(id: number) {
    const speciality = await this.specialityRepository.findOne({
      where: { id: id },
      relations: ['doctors'],
    });
    if (!speciality) {
      throw new NotFoundException(`Speciality with ID ${id} not found`);
    }
    return speciality;
  }

  async update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    const speciality = await this.findOne(id);
    speciality.updatedAt = new Date();
    speciality.updatedBy = 1;
    this.specialityRepository.merge(speciality, updateSpecialityDto);
    return await this.specialityRepository.save(speciality);
  }

  async remove(id: number) {
    const speciality = await this.findOne(id);
    return await this.specialityRepository.remove(speciality);
  }
}
