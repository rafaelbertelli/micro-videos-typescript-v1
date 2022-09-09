/* eslint-disable @typescript-eslint/no-namespace */
import { getModelToken } from '@nestjs/sequelize';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from 'mvt-core/category/application';
import { CategoryRepository } from 'mvt-core/category/domain';
import {
  CategoryInMemoryRepository,
  CategorySequelize,
} from 'mvt-core/category/infra';

export namespace CATEGORY_PROVIDERS {
  const providers = {
    CATEGORY_IN_MEMORY_REPOSITORY: 'CategoryInMemoryRepository',
    CATEGORY_SEQUELIZE_REPOSITORY: 'CategorySequelizeRepository',
  };

  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: providers.CATEGORY_IN_MEMORY_REPOSITORY,
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: providers.CATEGORY_SEQUELIZE_REPOSITORY,
      useFactory: (categoryModel: typeof CategorySequelize.CategoryModel) => {
        return new CategorySequelize.CategorySequelizeRepository(categoryModel);
      },
      inject: [getModelToken(CategorySequelize.CategoryModel)],
    };

    /**
     * Este é um ALIAS onde eu controlo por aqui qual dos repositórios estou usando
     * assim, quando precisar alterar o repositório, eu altero apenas aqui,
     * pois os USE_CASES estão consumindo deste ALIAS.
     */
    export const CATEGORY_REPOSITORY = {
      provide: 'CategoryRepository',
      useExisting: providers.CATEGORY_SEQUELIZE_REPOSITORY,
    };
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase(repository);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const LIST_CATEGORY_USE_CASE = {
      provide: ListCategoriesUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase(repository);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase(repository);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategoryUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new GetCategoryUseCase(repository);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategoryUseCase,
      useFactory: (repository: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase(repository);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
  }
}
