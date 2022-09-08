import { ListCategoriesUseCase } from "#category/application/use-cases/list-categories.use-case";
import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";
import faker from "@faker-js/faker";

const { CategoryModel, CategorySequelizeRepository, CategoryModelMapper } =
  CategorySequelize;

describe("ListCategoriesUseCase Integration Test", () => {
  jest.setTimeout(20000);
  setupSequelize({ models: [CategoryModel] });

  let usecase: ListCategoriesUseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new ListCategoriesUseCase(repository);
  });

  describe("execute method", () => {
    it("should return output with categories ordered by desc created_at even when search input is empty", async () => {
      const models = await CategoryModel.factory()
        .count(2)
        .bulkCreate((index: number) => ({
          id: faker.datatype.uuid(),
          name: `category name ${index}`,
          description: `category description ${index}`,
          is_active: true,
          created_at: new Date(new Date().getTime() + index),
        }));

      const output = await usecase.execute({});

      expect(output).toMatchObject({
        items: [...models]
          .reverse()
          .map(CategoryModelMapper.toEntity)
          .map((i) => i.toJSON()),
        total: 2,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      });
    });

    it("should returns output using pagination, sort and filter", async () => {
      const name = (index: number) => {
        if (index === 0) return "a";
        if (index === 1) return "AAA";
        if (index === 2) return "AaA";
        if (index === 3) return "b";
        if (index === 4) return "c";
        return "d";
      };

      const models = CategoryModel.factory()
        .count(5)
        .bulkMake((index) => ({
          id: faker.datatype.uuid(),
          name: name(index),
          description: `category description ${index}`,
          is_active: true,
          created_at: new Date(new Date().getTime() + index),
        }));

      await CategoryModel.bulkCreate(models.map((m) => m.toJSON()));

      let output = await usecase.execute({
        page: 1,
        per_page: 2,
        sort: "name",
        filter: "a",
      });
      expect(output).toMatchObject({
        items: [models[1], models[2]]
          .map(CategorySequelize.CategoryModelMapper.toEntity)
          .map((i) => i.toJSON()),
        total: 3,
        current_page: 1,
        per_page: 2,
        last_page: 2,
      });

      output = await usecase.execute({
        page: 2,
        per_page: 2,
        sort: "name",
        filter: "a",
      });
      expect(output).toMatchObject({
        items: [models[0]]
          .map(CategorySequelize.CategoryModelMapper.toEntity)
          .map((i) => i.toJSON()),
        total: 3,
        current_page: 2,
        per_page: 2,
        last_page: 2,
      });

      output = await usecase.execute({
        page: 1,
        per_page: 2,
        sort: "name",
        sort_dir: "desc",
        filter: "a",
      });
      expect(output).toMatchObject({
        items: [models[0], models[2]]
          .map(CategorySequelize.CategoryModelMapper.toEntity)
          .map((i) => i.toJSON()),
        total: 3,
        current_page: 1,
        per_page: 2,
        last_page: 2,
      });
    });
  });
});
