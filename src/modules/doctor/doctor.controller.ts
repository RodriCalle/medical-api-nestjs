import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('speciality/:specialityId')
  findAllBySpecialityId(@Param('specialityId') specialityId: number) {
    return this.doctorService.findAllBySpecialityId(specialityId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorService.remove(id);
  }
}
