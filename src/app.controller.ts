import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @ApiOperation({
    summary: '테스트용 api',
    description: '테스트용 api로 무조건 값을 반환합니다.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
