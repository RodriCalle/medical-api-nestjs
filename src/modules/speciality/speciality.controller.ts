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
import { SpecialityService } from './speciality.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

// @UseGuards(AuthGuard)
// @ApiTags('speciality')
@ApiBearerAuth()
@Controller('speciality')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialityService.create(createSpecialityDto);
  }

  @Get()
  findAll() {
    return this.specialityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.specialityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSpecialityDto: UpdateSpecialityDto,
  ) {
    return this.specialityService.update(id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.specialityService.remove(id);
  }
}
