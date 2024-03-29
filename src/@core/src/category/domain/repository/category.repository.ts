import { SearchableRepositoryInterface } from "#seedwork/domain/repository/repository-contracts";
import { SearchParams as SearchParamsVO } from "#seedwork/domain/value-objects/search-params.vo";
import { SearchResult as SearchResultVO } from "#seedwork/domain/value-objects/search-result.vo";
import { Category } from "../entities/category";

export namespace CategoryRepository {
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
