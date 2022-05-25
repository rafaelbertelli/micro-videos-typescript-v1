import Category from "../../domain/entities/category";
import CategoryInMemoryRepository from "../category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  it("should return all items when it has no filter", async () => {
    const repository = new CategoryInMemoryRepository();
    const items = [new Category({ name: "test" }), new Category({ name: "b" })];
    const spyItemsFilter = jest.spyOn(items, "filter" as any);

    const result = await repository["applyFilter"](items, "");
    expect(result).toStrictEqual(items);
    expect(spyItemsFilter).not.toHaveBeenCalled();
  });

  it("should return filtered items", async () => {
    const repository = new CategoryInMemoryRepository();
    const items = [new Category({ name: "test" }), new Category({ name: "b" })];
    const spyItemsFilter = jest.spyOn(items, "filter" as any);

    const result = await repository["applyFilter"](items, "b");
    expect(result).toStrictEqual([items[1]]);
    expect(spyItemsFilter).toHaveBeenCalled();
  });
});
