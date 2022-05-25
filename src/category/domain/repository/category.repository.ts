import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { default as SearchParamsVO } from "../../../@seedwork/domain/value-objects/search-params.vo";
import { default as SearchResultVO } from "../../../@seedwork/domain/value-objects/search-result.vo";
import Category from "../entities/category";

namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends SearchParamsVO<Filter> {}

  export class SearchResult extends SearchResultVO<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;
