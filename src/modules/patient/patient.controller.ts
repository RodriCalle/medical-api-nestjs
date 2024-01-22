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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientService.remove(id);
  }
}
