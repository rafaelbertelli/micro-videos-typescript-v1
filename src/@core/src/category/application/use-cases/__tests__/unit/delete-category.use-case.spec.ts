import { DeleteCategoryUseCase } from "#category/application/use-cases/delete-category.use-case";
import { Category } from "#category/domain/entities/category";
import { CategoryInMemoryRepository } from "#category/infra/db/in-memory-repository/category-in-memory.repository";
import { NotFoundError } from "#seedwork/domain/errors/not-found-error";

describe("DeleteCategoryUseCase", () => {
  let usecase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
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
    const entity = new Category({ name: "name", description: "description" });
    repository.items = [entity];

    expect(repository.items.length).toBe(1);

    await usecase.execute({ id: entity.id });

    expect(repository.items.length).toBe(0);
  });
});
