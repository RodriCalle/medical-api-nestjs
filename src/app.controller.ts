import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Cron('* * * * * *')
  // handleCron() {
  //   this.logger.debug('Llamado cada segundo...');
  // }
}
