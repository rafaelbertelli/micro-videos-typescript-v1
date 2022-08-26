import { Category } from "#category/domain";
import { NotFoundError } from "#seedwork/domain";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category.repository";

describe("Category Sequelize Repository", () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [CategoryModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("insert", () => {
    it("should insert a new entity", async () => {
      const categoryA = new Category({ name: "Teste" });
      const categoryB = new Category({
        name: "Teste",
        description: "Cripta",
        is_active: false,
      });

      await repository.insert(categoryA);
      await repository.insert(categoryB);

      const resultA = await CategoryModel.findByPk(categoryA.id);
      const resultB = await CategoryModel.findByPk(categoryB.id);

      expect(resultA.toJSON()).toStrictEqual(categoryA.toJSON());
      expect(resultB.toJSON()).toStrictEqual(categoryB.toJSON());
    });
  });

  describe("findById", () => {
    it("should throw an error if entity is not found", async () => {
      await expect(repository.findById("invalid-id")).rejects.toThrow(
        new NotFoundError(`Entity with id invalid-id not found`)
      );
    });

    it("should find an entity by id", async () => {
      const category = new Category({ name: "Teste" });
      const { id, uniqueEntityId } = category;

      await repository.insert(category);
      const model_id = await repository.findById(id);
      const model_UID = await repository.findById(uniqueEntityId);

      expect(model_id.toJSON()).toStrictEqual(category.toJSON());
      expect(model_UID.toJSON()).toStrictEqual(category.toJSON());
    });
  });
});
