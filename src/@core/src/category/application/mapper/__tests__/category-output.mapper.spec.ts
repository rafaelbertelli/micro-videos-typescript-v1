import { Category } from "../../../domain/entities/category";
import { CategoryOutputMapper } from "../category-output.mapper";

describe("CategoryOutputMapper", () => {
  it("should return a mapped category", () => {
    const category = new Category({
      name: "Category 1",
      description: "Description 1",
      is_active: true,
      created_at: new Date(),
    });

    const spyToJSON = jest.spyOn(category, "toJSON");
    const output = CategoryOutputMapper.toOutput(category);
    const categoryJson = category.toJSON();

    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual(categoryJson);
    expect(output).toStrictEqual({
      id: categoryJson.id,
      name: categoryJson.name,
      description: categoryJson.description,
      is_active: categoryJson.is_active,
      created_at: categoryJson.created_at,
    });
  });
});
