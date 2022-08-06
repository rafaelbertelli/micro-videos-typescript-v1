import NotFoundError from "../../../../@seedwork/domain/errors/not-found-error";
import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";

describe("GetCategoryUseCase", () => {
  let usecase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
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
    const items = [
      new Category({ name: "Test1", description: "Test1", is_active: true }),
      new Category({ name: "Test2", description: "Test2", is_active: true }),
    ];

    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await usecase.execute({ id: items[0].id });
    const repositoryOutput = repository.items[0];

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output.id).toBe(repositoryOutput.id);
    expect(output.name).toBe(repositoryOutput.name);
    expect(output.description).toBe(repositoryOutput.description);
    expect(output.is_active).toBe(repositoryOutput.is_active);
    expect(output.created_at).toBe(repositoryOutput.created_at);
  });
});
