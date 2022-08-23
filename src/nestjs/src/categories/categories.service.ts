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
  /**
   * se der problema nos testes ou em casos de uso
   * posso remover o readonly
   * pois eu adicionei ele aqui só pra conhecer seu comportamento
   */

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
    console.log('create...', createCategoryDto);
    try {
      return this.createUseCase.execute(createCategoryDto);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  search(@Query() searchParams: SearchCategoryDto) {
    return this.listCategoriesUseCase.execute(searchParams);
  }

  findOne(id: string) {
    return this.getCategoryUseCase.execute({ id });
  }

  update(updateCategoryDto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(updateCategoryDto);
  }

  remove(id: string) {
    return this.deleteCategoryUseCase.execute({ id });
  }
}
