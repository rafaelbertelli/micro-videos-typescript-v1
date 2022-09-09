import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelize } from 'mvt-core/category/infra';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CATEGORY_PROVIDERS } from './category.providers';

@Module({
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
