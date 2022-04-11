import { Category } from "./category";

describe("Category tests", () => {
  it("category constructor", () => {
    const category = new Category("movie");
    expect(category).toBeInstanceOf(Category);
    expect(category.name).toBe("movie");
  });
});
