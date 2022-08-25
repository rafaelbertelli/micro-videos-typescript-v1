import { SearchParams } from "#seedwork/domain/value-objects/search-params.vo";
import { Category } from "../../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  describe("search with filter", () => {
    it("should return all items when it has no filter", async () => {
      const repository = new CategoryInMemoryRepository();
      const items = [
        new Category({ name: "test", created_at: new Date("2020-01-01") }),
        new Category({ name: "b", created_at: new Date("2020-01-02") }),
      ];
      repository.items = items;
      const spyItemsFilter = jest.spyOn(items, "filter" as any);
      const result = await repository.search(new SearchParams());

      expect(result.items).toStrictEqual([items[1], items[0]]);
      expect(spyItemsFilter).not.toHaveBeenCalled();
    });

    it("should return filtered items by name", async () => {
      const repository = new CategoryInMemoryRepository();
      const items = [
        new Category({ name: "test" }),
        new Category({ name: "test C" }),
        new Category({ name: "b" }),
        new Category({ name: "d" }),
        new Category({ name: "e" }),
      ];
      repository.items = items;
      const spyItemsFilter = jest.spyOn(items, "filter" as any);

      let result = await repository.search(
        new SearchParams({
          filter: "test",
          sort: "name",
        })
      );
      expect(result.items).toStrictEqual([items[0], items[1]]);
      expect(spyItemsFilter).toHaveBeenCalledTimes(1);

      result = await repository.search(
        new SearchParams({
          filter: "b",
          sort: "name",
        })
      );
      expect(result.items).toStrictEqual([items[2]]);
      expect(spyItemsFilter).toHaveBeenCalledTimes(2);
    });

    it("should return filtered by created_at when not specified sort element", async () => {
      const repository = new CategoryInMemoryRepository();
      const items = [
        new Category({ name: "test", created_at: new Date("2020-01-01") }),
        new Category({ name: "test F", created_at: new Date("2020-01-03") }),
        new Category({ name: "test C", created_at: new Date("2020-01-02") }),
      ];
      repository.items = items;

      const result = await repository.search(new SearchParams());
      expect(result.items).toStrictEqual([items[1], items[2], items[0]]);
    });
  });
});
