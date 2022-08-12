import { CategoryInMemoryRepository } from "../../../infra/category-in-memory.repository";
import { CreateCategoryUseCase } from "../create-category.use-case";

describe("CreateCategoryUseCase", () => {
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
