import { Category, CategoryRepository } from "#category/domain";
import {
  EntityValidationError,
  LoadEntityError,
  NotFoundError,
  UniqueEntityId,
} from "#seedwork/domain";
import { SequelizeModelFactory } from "#seedwork/infra/db/sequelize/sequeliize-model-factory";
import { Op } from "sequelize";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export namespace CategorySequelize {
  // #region TYPE
  type CategoryModelProps = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
  };
  // #endregion TYPE

  // #region MODEL
  @Table({ tableName: "categories", timestamps: false })
  export class CategoryModel extends Model<CategoryModelProps> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ type: DataType.TEXT })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare is_active: boolean;

    @Column({ allowNull: false, type: DataType.DATE })
    declare created_at: Date;

    /**
     * Estou colocalndo uma factory pra gerar um repositório falso pra me ajudar nos testes aqui,
     * porém, acredito que depois que eu conseguir consolidadar a idéia do que ele vai ser,
     * este método possa ter sua próprica classe
     */

    static factory() {
      const { faker } = require("@faker-js/faker");

      const dataModel = {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        description: faker.lorem.paragraph(),
        is_active: faker.datatype.boolean(),
        created_at: faker.date.past(),
      };

      return new SequelizeModelFactory<CategoryModel, CategoryModelProps>(
        CategoryModel,
        () => dataModel
      );
    }
  }
  // #endregion MODEL

  // #region REPOSITORY
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
  // #endregion REPOSITORY

  // #region MAPPER
  export class CategoryModelMapper {
    static toEntity(model: CategorySequelize.CategoryModel): Category {
      try {
        return new Category(model.toJSON());
      } catch (e: any) {
        if (e instanceof EntityValidationError) {
          throw new LoadEntityError(e.error);
        }

        throw e;
      }
    }
  }
  // #endregion MAPPER
}
