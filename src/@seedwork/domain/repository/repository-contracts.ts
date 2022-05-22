import Entity from "../entity/entity";
import SearchParams from "../value-objects/search-params.vo";
import SearchResult from "../value-objects/search-result.vo";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;

  findById(id: string | UniqueEntityId): Promise<E>;

  findAll(): Promise<E[]>;

  update(entity: E): Promise<void>;

  delete(id: string | UniqueEntityId): Promise<void>;
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  sortableFields: string[];
  search(query: SearchInput): Promise<SearchOutput>;
}
