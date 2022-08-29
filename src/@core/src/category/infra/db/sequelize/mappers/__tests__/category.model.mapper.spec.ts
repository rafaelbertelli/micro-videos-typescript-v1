import { Category } from "#category/domain";
import { LoadEntityError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/db/testing/setup-sequelize";
import { CategoryModel } from "../../category.model";
import { CategoryModelMapper } from "../category.model.mapper";

describe("Category model mapper", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should convert to Category", () => {
    const arrange = {
      id: "cf38fe77-6033-4bf5-b481-0bc715d8a64f",
      name: "Teste",
      description: "Descrição",
      is_active: true,
      created_at: new Date(),
    };

    const model = new CategoryModel(arrange);
    const category = new Category(arrange);
    const result = CategoryModelMapper.toEntity(model);

    expect(result.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should throw an error", async () => {
    const model = CategoryModel.build({
      id: "cf38fe77-6033-4bf5-b481-0bc715d8a64f",
    });

    try {
      CategoryModelMapper.toEntity(model);
    } catch (error: any) {
      expect(error).toBeInstanceOf(LoadEntityError);
      expect(error.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw new Error("Generic Error");
      });

    const model = CategoryModel.build({
      id: "cf38fe77-6033-4bf5-b481-0bc715d8a64f",
    });

    expect(() => CategoryModelMapper.toEntity(model)).toThrow(
      new Error("Generic Error")
    );
    expect(spyValidate).toHaveBeenCalled();
  });
});
