import { NotFoundError } from "#seedwork/domain/errors/not-found-error";
import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../update-category.use-case";

describe("UpdateCategoryUseCase", () => {
  let usecase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new UpdateCategoryUseCase(repository);
  });

  it("should throw error when entity is not found", async () => {
    await usecase.execute({ id: "1", name: "name" }).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
    });

    await expect(() =>
      usecase.execute({ id: "1", name: "name" })
    ).rejects.toThrow(new NotFoundError("Entity with id 1 not found"));
  });

  it("should update a category changing name, description and is_active", async () => {
    const spyUpdate = jest.spyOn(repository, "update");

    const category = new Category({
      name: "Category 1",
      description: "Category 1 description",
    });

    repository.items = [category];

    const updatedCategory = await usecase.execute({
      id: category.id,
      name: "Category 1 updated",
      description: "Category 1 description updated",
      is_active: true,
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(updatedCategory.name).toBe("Category 1 updated");
    expect(updatedCategory.description).toBe("Category 1 description updated");
    expect(updatedCategory.is_active).toBeTruthy();
  });

  it("should update a category setting is_active to false", async () => {
    const category = new Category({
      name: "Category 1",
      description: "Category 1 description",
    });

    repository.items = [category];

    const updatedCategory = await usecase.execute({
      id: category.id,
      name: "Category 1 updated",
      description: "Category 1 description updated",
      is_active: false,
    });

    expect(updatedCategory.name).toBe("Category 1 updated");
    expect(updatedCategory.description).toBe("Category 1 description updated");
    expect(updatedCategory.is_active).toBeFalsy();
  });

  it("should update a category persisting its is_active as true", async () => {
    const category = new Category({
      name: "Category 1",
      description: "Category 1 description",
      is_active: true,
    });

    repository.items = [category];

    const updatedCategory = await usecase.execute({
      id: category.id,
      name: "Category 1 updated",
      description: "Category 1 description updated",
    });

    expect(updatedCategory.name).toBe("Category 1 updated");
    expect(updatedCategory.description).toBe("Category 1 description updated");
    expect(updatedCategory.is_active).toBeTruthy();
  });

  it("should update a category persisting its is_active as false", async () => {
    const category = new Category({
      name: "Category 1",
      description: "Category 1 description",
      is_active: false,
    });

    repository.items = [category];

    const updatedCategory = await usecase.execute({
      id: category.id,
      name: "Category 1 updated",
      description: "Category 1 description updated",
    });

    expect(updatedCategory.name).toBe("Category 1 updated");
    expect(updatedCategory.description).toBe("Category 1 description updated");
    expect(updatedCategory.is_active).toBeFalsy();
  });

  it("should update a category setting descriptions to null when it is not defined", async () => {
    const category = new Category({
      name: "Category 1",
      description: "Category 1 description",
    });

    repository.items = [category];

    const updatedCategory = await usecase.execute({
      id: category.id,
      name: "Category 1 updated",
      description: null,
    });

    expect(updatedCategory.name).toBe("Category 1 updated");
    expect(updatedCategory.description).toBeNull();
  });
});
