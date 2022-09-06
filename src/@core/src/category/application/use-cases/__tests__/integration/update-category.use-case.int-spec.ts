import { CategorySequelize } from "#category/infra";
import { NotFoundError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra";
import { UpdateCategoryUseCase } from "../../update-category.use-case";

const { CategoryModel, CategorySequelizeRepository } = CategorySequelize;

describe("UpdateCategoryUseCase Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  let usecase: UpdateCategoryUseCase;
  let repository: CategorySequelize.CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    usecase = new UpdateCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      usecase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(new NotFoundError("Entity with id fake id not found"));
  });

  it("should update a category", async () => {
    const model = await CategoryModel.factory().create();

    let output = await usecase.execute({
      id: model.id,
      name: "test",
      is_active: true,
    });

    expect(output).toStrictEqual({
      id: model.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: model.created_at,
    });

    const arrange = [
      {
        input: {
          id: model.id,
          name: "test",
          is_active: false,
        },
        expected: {
          id: model.id,
          name: "test",
          description: null,
          is_active: false,
          created_at: model.created_at,
        },
      },
      {
        input: {
          id: model.id,
          name: "test",
          is_active: false,
        },
        expected: {
          id: model.id,
          name: "test",
          description: null,
          is_active: false,
          created_at: model.created_at,
        },
      },
      {
        input: {
          id: model.id,
          name: "test",
          is_active: true,
        },
        expected: {
          id: model.id,
          name: "test",
          description: null,
          is_active: true,
          created_at: model.created_at,
        },
      },
      {
        input: {
          id: model.id,
          name: "test",
          description: "some description",
          is_active: false,
        },
        expected: {
          id: model.id,
          name: "test",
          description: "some description",
          is_active: false,
          created_at: model.created_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await usecase.execute({
        id: i.input.id,
        name: i.input.name,
        description: i.input.description,
        is_active: i.input.is_active,
      });
      expect(output).toStrictEqual({
        id: model.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at,
      });
    }
  });
});
