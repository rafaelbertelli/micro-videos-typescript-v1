import { SequelizeModelFactory } from "#seedwork/infra/db/sequelize/sequeliize-model-factory";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

type CategoryModelProps = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

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
