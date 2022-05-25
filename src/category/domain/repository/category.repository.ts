import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import SearchParams from "../../../@seedwork/domain/value-objects/search-params.vo";
import SearchResult from "../../../@seedwork/domain/value-objects/search-result.vo";
import Category from "../entities/category";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<
  Category,
  CategoryFilter
> {}

export default interface CategoryRepository
  extends SearchableRepositoryInterface<
    Category,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
