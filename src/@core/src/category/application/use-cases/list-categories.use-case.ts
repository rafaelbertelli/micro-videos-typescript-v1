import { PaginationOutputDto } from "#seedwork/application/dto/pagination-output.dto";
import { SearchInputDto } from "#seedwork/application/dto/search-input.dto";
import { PaginationOutputMapper } from "#seedwork/application/mapper/pagination-output.mapper";
import { IUseCase } from "#seedwork/application/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";
import { CategoryOutputMapper } from "../mapper/category-output.mapper";

export class ListCategoriesUseCase
  implements IUseCase<InputListCategory, OutputListCategory>
{
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: InputListCategory): Promise<OutputListCategory> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(
    searchResult: CategoryRepository.SearchResult
  ): OutputListCategory {
    const toPaginationOutput = PaginationOutputMapper.toOutput(searchResult);
    const items = searchResult.items.map(CategoryOutputMapper.toOutput);

    return {
      items,
      ...toPaginationOutput,
    };
  }
}

export type InputListCategory = SearchInputDto;

export type OutputListCategory = {
  items: CategoryOutput[];
} & PaginationOutputDto;
