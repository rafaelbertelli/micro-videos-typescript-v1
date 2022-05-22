import NotFoundError from "../../errors/not-found-error";
import Entity from "../entity/entity";
import SearchParams, {
  SortDirections,
} from "../value-objects/search-params.vo";
import SearchResult from "../value-objects/search-result.vo";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const index = await this.elementIndex(id.toString());
    return this.items[index];
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = await this.elementIndex(entity.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const index = await this.elementIndex(id);
    this.items.splice(index, 1);
  }

  protected async elementIndex(id: string | UniqueEntityId): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id.toString());

    if (index === -1) {
      throw new NotFoundError(`Entity with id ${id} not found`);
    }

    return index;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  async search(query: SearchParams): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, query.filter);
    const sortedItems = await this.applySort(
      filteredItems,
      query.sort,
      query.sort_dir
    );
    const paginatedItems = await this.applyPagination(
      sortedItems,
      query.page,
      query.per_page
    );

    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: query.page,
      per_page: query.per_page,
      sort: query.sort,
      sort_dir: query.sort_dir,
      filter: query.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirections | null
  ): Promise<E[]> {
    if (!(sort || this.sortableFields.includes(sort))) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === "asc" ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  protected abstract applyPagination(
    items: E[],
    page: SearchParams["page"],
    perPage: SearchParams["per_page"]
  ): Promise<E[]>;
}
