import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { AppointmentDetailService } from './appointment-detail.service';
import { UpdateAppointmentDetailDto } from './dto/update-appointment-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('appointment-detail')
@Controller('appointment-detail')
export class AppointmentDetailController {
  constructor(
    private readonly appointmentDetailService: AppointmentDetailService,
  ) {}

  @Get()
  findAll() {
    return this.appointmentDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDetailDto: UpdateAppointmentDetailDto,
  ) {
    return this.appointmentDetailService.update(
      +id,
      updateAppointmentDetailDto,
    );
  }
}
