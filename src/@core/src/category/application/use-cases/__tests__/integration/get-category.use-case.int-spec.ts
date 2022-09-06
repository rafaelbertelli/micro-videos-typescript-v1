import { GetCategoryUseCase } from "#category/application/use-cases/get-category.use-case";
import { CategorySequelize } from "#category/infra";
import { NotFoundError } from "#seedwork/domain/errors/not-found-error";
import { setupSequelize } from "#seedwork/infra";

const { CategoryModel, CategorySequelizeRepository } = CategorySequelize;

describe("GetCategoryUseCase Integration Tests", () => {
  jest.setTimeout(10000);
  setupSequelize({ models: [CategoryModel] });

  let usecase: GetCategoryUseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new GetCategoryUseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await usecase.execute({ id: "1" }).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
    });

    await expect(() => usecase.execute({ id: "1" })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should return a category", async () => {
    const model = await CategoryModel.factory().create();
    const output = await usecase.execute({ id: model.id });
    expect(output).toStrictEqual(model.toJSON());
  });
});
