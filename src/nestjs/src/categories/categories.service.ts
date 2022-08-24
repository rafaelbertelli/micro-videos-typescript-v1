import { Inject, Injectable, Query } from '@nestjs/common';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  UpdateCategoryUseCase,
} from 'mvt-core/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase)
  private readonly createUseCase: CreateCategoryUseCase;

  @Inject(ListCategoriesUseCase)
  private readonly listCategoriesUseCase: ListCategoriesUseCase;

  @Inject(DeleteCategoryUseCase)
  private readonly deleteCategoryUseCase: DeleteCategoryUseCase;

  @Inject(GetCategoryUseCase)
  private readonly getCategoryUseCase: GetCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private readonly updateCategoryUseCase: UpdateCategoryUseCase;

  create(createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  search(@Query() searchParams: SearchCategoryDto) {
    return this.listCategoriesUseCase.execute(searchParams);
  }

  findOne(id: string) {
    return this.getCategoryUseCase.execute({ id });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute({ id, ...updateCategoryDto });
  }

  remove(id: string) {
    return this.deleteCategoryUseCase.execute({ id });
  }
}
