import { CreateCategoryUseCase } from "#category/application/use-cases/create-category.use-case";
import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";

const { CategoryModel, CategorySequelizeRepository } = CategorySequelize;

describe("CreateCategoryUseCase Integration Tests", () => {
  jest.setTimeout(10000);
  setupSequelize({ models: [CategoryModel] });

  let usecase: CreateCategoryUseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new CreateCategoryUseCase(repository);
  });

  describe("should create a category", () => {
    const arrange = [
      { name: "Movie" },
      { name: "Movie 2", description: "Description 2" },
      { name: "Movie 3", description: "Description 3", is_active: false },
      { name: "Movie 4", description: "Description 4", is_active: true },
      { name: "Movie 5", is_active: false, created_at: new Date() },
    ];

    test.each(arrange)("from %o", async (item) => {
      let output = await usecase.execute(item);
      let entity = await repository.findById(output.id);
      let result = entity.toJSON();

      expect(output).toStrictEqual({
        id: result.id,
        name: result.name,
        description: result.description,
        created_at: result.created_at,
        is_active: result.is_active,
      });
    });
  });
});
