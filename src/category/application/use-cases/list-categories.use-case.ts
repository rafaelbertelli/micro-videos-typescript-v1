import { PaginationOutputDto } from "../../../@seedwork/application/dto/pagination-output.dto";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input.dto";
import PaginationOutputMapper from "../../../@seedwork/application/mapper/pagination-output.mapper";
import IUseCase from "../../../@seedwork/application/use-case.interface";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";
import CategoryOutputMapper from "../mapper/category-output.mapper";

export default class ListCategoriesUseCase implements IUseCase<Input, Output> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const toPaginationOutput: PaginationOutputDto =
      PaginationOutputMapper.toPaginationOutput(searchResult);

    const toCategoryOutput: CategoryOutput[] = searchResult.items.map(
      (category) => CategoryOutputMapper.toCategoryOutput(category)
    );

    const toCategoriesOutput: { items: CategoryOutput[] } = {
      items: toCategoryOutput,
    };

    return {
      ...toCategoriesOutput,
      ...toPaginationOutput,
    };
  }
}

type Input = SearchInputDto;

type Output = {
  items: CategoryOutput[];
} & PaginationOutputDto;
