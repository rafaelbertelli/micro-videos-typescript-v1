import { CreateCategoryUseCase } from "#category/application/use-cases/create-category.use-case";
import { CategoryInMemoryRepository } from "#category/infra/db/in-memory-repository/category-in-memory.repository";

describe("CreateCategoryUseCase Unit Tests", () => {
  let usecase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new CreateCategoryUseCase(repository);
  });

  it("should create a category only with category.name", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    const input = {
      name: "Test",
      description: "Test",
      is_active: true,
    };

    const output = await usecase.execute(input);
    const repositoryOutput = repository.items[0];

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(repositoryOutput.id);
    expect(output.name).toBe(repositoryOutput.name);
    expect(output.description).toBe(repositoryOutput.description);
    expect(output.is_active).toBe(repositoryOutput.is_active);
    expect(output.created_at).toBe(repositoryOutput.created_at);
  });
});
