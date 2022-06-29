import CategoryInMemoryRepository from "../../../infra/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";
import GetCategoryUseCase from "../get-category.use-case";
import UniqueEntityId from "../../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import NotFoundError from "../../../../@seedwork/errors/not-found-error";
import Category from "../../../domain/entities/category";

describe("GetCategoryUseCase", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let getCategoryUseCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;
  const id1 = new UniqueEntityId();
  const id2 = new UniqueEntityId();

  beforeEach(async () => {
    repository = new CategoryInMemoryRepository();
    getCategoryUseCase = new GetCategoryUseCase(repository);
  });

  it("should throw an error if id is not a valid uuid", async () => {
    const input = {
      id: "invalid-id",
    };

    await expect(getCategoryUseCase.execute(input)).rejects.toThrow(
      new NotFoundError("Entity with id invalid-id not found")
    );
  });

  it("should get a category", async () => {
    const items = [new Category({ name: "Test" })];
    repository.items = items;

    const output = await getCategoryUseCase.execute({ id: items[0].id });
    const repositoryOutput = repository.items[0];

    expect(output.id).toBe(repositoryOutput.id);
    expect(output.name).toBe(repositoryOutput.name);
    expect(output.description).toBe(repositoryOutput.description);
    expect(output.is_active).toBe(repositoryOutput.is_active);
    expect(output.created_at).toBe(repositoryOutput.created_at);
  });
});
