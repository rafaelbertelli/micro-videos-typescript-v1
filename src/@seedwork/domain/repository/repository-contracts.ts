import Entity from "../entity/entity";
import SearchParams from "../value-objects/search-params-vo";
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
  SearchOutput,
  SearchInput = SearchParams
> extends RepositoryInterface<E> {
  search(query: SearchInput): Promise<SearchOutput>;
}
