import { DeleteCategoryUseCase } from "#category/application/use-cases/delete-category.use-case";
import { CategorySequelize } from "#category/infra";
import { NotFoundError } from "#seedwork/domain/errors/not-found-error";
import { setupSequelize } from "#seedwork/infra";

const { CategoryModel, CategorySequelizeRepository } = CategorySequelize;

describe("DeleteCategoryUseCase Integration Tests", () => {
  jest.setTimeout(10000);
  setupSequelize({ models: [CategoryModel] });

  let usecase: DeleteCategoryUseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new DeleteCategoryUseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await usecase.execute({ id: "1" }).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
    });

    await expect(() => usecase.execute({ id: "1" })).rejects.toThrow(
      new NotFoundError("Entity with id 1 not found")
    );
  });

  it("should delete entity", async () => {
    const { id } = await CategoryModel.factory().create();
    await usecase.execute({ id });
    const hasNoModel = await CategoryModel.findByPk(id);
    expect(hasNoModel).toBeNull();
  });
});
