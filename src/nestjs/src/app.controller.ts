import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// import Category from 'micro-videos-typescript-core/category/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // const category = new Category({ name: 'test' });
    // console.log('Category: ', Category);

    return this.appService.getHello();
  }
}
