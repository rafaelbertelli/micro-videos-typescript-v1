import { Category, CategoryRepository } from "#category/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { CategoryModel } from "./category.model";
import { CategoryModelMapper } from "./mappers/category.model.mapper";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["id", "name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._getBy(`${id}`);
    const result = CategoryModelMapper.toEntity(model);
    return result;
  }

  async findAll(): Promise<Category[]> {}

  async update(entity: Category): Promise<void> {}

  async delete(id: string | UniqueEntityId): Promise<void> {}

  async search(
    query: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {}

  private async _getBy(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(`${id}`, {
      rejectOnEmpty: new NotFoundError(`Entity with id ${id} not found`),
    });
  }
}
