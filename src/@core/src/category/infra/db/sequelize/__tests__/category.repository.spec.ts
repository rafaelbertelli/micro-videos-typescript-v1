import { Category } from "#category/domain";
import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/db/testing/setup-sequelize";
import { CategoryModel } from "../category.model";
import { CategorySequelizeRepository } from "../category.repository";

describe("Category Sequelize Repository", () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
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

  describe("findAll", () => {
    it("should return all categories", async () => {
      const category = new Category({ name: "Teste" });
      await repository.insert(category);

      const result = await repository.findAll();

      expect(result).toHaveLength(1);
      expect(JSON.stringify(result)).toStrictEqual(JSON.stringify([category]));
    });
  });
});
