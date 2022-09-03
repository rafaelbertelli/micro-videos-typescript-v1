import { Category, CategoryRepository } from "#category/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { Op } from "sequelize";
import { CategoryModel } from "./category.model";
import { CategoryModelMapper } from "./mappers/category.model.mapper";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  defaultSort: string = "created_at";
  sortableFields: string[] = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const model = await this._getBy(`${id}`);
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map(CategoryModelMapper.toEntity);
  }

  async update(entity: Category): Promise<void> {
    await this._getBy(entity.id);
    await this.categoryModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._getBy(_id);
    this.categoryModel.destroy({ where: { id: _id } });
  }

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: {
            [Op.like]: `%${props.filter}%`,
          },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [[this.defaultSort, "DESC"]] }),
      offset,
      limit,
    });

    const normalizeSort = this.sortableFields.includes(props.sort)
      ? props.sort
      : this.defaultSort;

    return new CategoryRepository.SearchResult({
      items: models.map((m) => CategoryModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: normalizeSort,
      sort_dir: props.sort_dir,
    });
  }

  private async _getBy(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(`${id}`, {
      rejectOnEmpty: new NotFoundError(`Entity with id ${id} not found`),
    });
  }
}
