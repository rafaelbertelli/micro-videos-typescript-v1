import { setupSequelize } from "#seedwork/infra/db/testing/setup-sequelize";
import { DataType } from "sequelize-typescript";
import { CategoryModel } from "../category.model";

describe("Category model", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should verify properties mapping", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);

    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    const id = attributesMap.id;
    const name = attributesMap.name;
    const description = attributesMap.description;
    const is_active = attributesMap.is_active;
    const created_at = attributesMap.created_at;

    expect(id).toMatchObject({
      type: DataType.UUID(),
      primaryKey: true,
      fieldName: "id",
      field: "id",
    });

    expect(name).toMatchObject({
      allowNull: false,
      type: DataType.STRING(255),
      fieldName: "name",
      field: "name",
    });

    expect(description).toMatchObject({
      type: DataType.TEXT(),
      fieldName: "description",
      field: "description",
    });

    expect(is_active).toMatchObject({
      allowNull: false,
      type: DataType.BOOLEAN(),
      fieldName: "is_active",
      field: "is_active",
    });

    expect(created_at).toMatchObject({
      allowNull: false,
      type: DataType.DATE(),
      fieldName: "created_at",
      field: "created_at",
    });
  });

  it("create", async () => {
    const arrange = {
      id: "61324291-5568-4dcc-ac9c-20635e50d934",
      name: "Test",
      description: "Description of test",
      is_active: true,
      created_at: new Date(),
    };

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toStrictEqual(arrange);
  });

  it("factory", async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll());
  });
});
