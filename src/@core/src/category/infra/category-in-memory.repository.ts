import { InMemorySearchableRepository } from "../../@seedwork/domain/repository/in-memory.repository";
import { SortDirections } from "../../@seedwork/domain/value-objects/search-params.vo";
import Category from "../domain/entities/category";
import { CategoryRepository } from "../domain/repository/category.repository";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirections | null
  ): Promise<Category[]> {
    if (!sort) {
      return super.applySort(items, "created_at", "desc");
    }

    return super.applySort(items, sort, sort_dir);
  }
}
