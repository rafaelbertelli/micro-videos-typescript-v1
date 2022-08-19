import { Module } from '@nestjs/common';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from 'mvt-core/category/application';
import { CategoryRepository } from 'mvt-core/category/domain';
import { CategoryInMemoryRepository } from 'mvt-core/category/infra';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase(repository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: ListCategoriesUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase(repository);
      },
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule {}
