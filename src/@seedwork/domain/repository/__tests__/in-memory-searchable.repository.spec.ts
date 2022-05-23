import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(
      (item) =>
        item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter
    );
  }
}

describe("InMemorySearchableRepository", () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe("applyFilter", () => {
    it("should return all items if filter is empty", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 2 }),
      ];
      const spyItemsFilter = jest.spyOn(items, "filter" as any);

      const result = await repository["applyFilter"](items, null);
      expect(result).toStrictEqual(items);
      expect(spyItemsFilter).not.toHaveBeenCalled();
    });

    it("should return all items if filter is not found", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 2 }),
      ];
      const spyItemsFilter = jest.spyOn(items, "filter" as any);

      const result = await repository["applyFilter"](items, "c");
      console.log(result);
      expect(result).toHaveLength(0);
      expect(spyItemsFilter).toHaveBeenCalled();
    });

    it("should return filtered items if filter is found", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];
      const spyItemsFilter = jest.spyOn(items, "filter" as any);
      let result: StubEntity[];

      result = await repository["applyFilter"](items, "TEST");
      expect(result).toStrictEqual([items[0], items[1]]);
      expect(spyItemsFilter).toHaveBeenCalled();

      result = await repository["applyFilter"](items, "FAKE");
      expect(result).toStrictEqual([items[2]]);
      expect(spyItemsFilter).toHaveBeenCalled();

      result = await repository["applyFilter"](items, "5");
      expect(result).toStrictEqual([items[0], items[1]]);
      expect(spyItemsFilter).toHaveBeenCalled();

      result = await repository["applyFilter"](items, "0");
      expect(result).toStrictEqual([items[2]]);
      expect(spyItemsFilter).toHaveBeenCalled();

      result = await repository["applyFilter"](items, "no-filter");
      expect(result).toHaveLength(0);
    });
  });

  describe("applySort", () => {
    it("should return all items if sort is empty", async () => {
      const items = [
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "a", price: 1 }),
      ];
      const spyItemsSort = jest.spyOn(items, "sort" as any);
      let result: StubEntity[];

      result = await repository["applySort"](items, null, null);
      expect(result).toStrictEqual(items);
      expect(spyItemsSort).not.toHaveBeenCalled();

      result = await repository["applySort"](items, "price", "asc");
      console.log(result);

      expect(result).toStrictEqual([items[1], items[0]]);
      expect(spyItemsSort).not.toHaveBeenCalled();
    });

    it("should return sorted items if sort is found", async () => {
      const items = [
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "c", price: 3 }),
      ];
      let result: StubEntity[];

      result = await repository["applySort"](items, "name", "asc");
      expect(result).toStrictEqual([items[1], items[0], items[2]]);

      result = await repository["applySort"](items, "name", "desc");
      expect(result).toStrictEqual([items[2], items[0], items[1]]);

      result = await repository["applySort"](items, "price", "asc");
      expect(result).toStrictEqual([items[1], items[0], items[2]]);

      result = await repository["applySort"](items, "price", "desc");
      expect(result).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe("applyPagination", () => {
    it("should return items per page, due to page size", async () => {
      const items = [
        new StubEntity({ name: "a", price: 1 }),
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "c", price: 3 }),
        new StubEntity({ name: "d", price: 4 }),
        new StubEntity({ name: "r", price: 5 }),
      ];
      let result: StubEntity[];

      result = await repository["applyPagination"](items, 1, 1);
      expect(result).toStrictEqual([items[0]]);

      result = await repository["applyPagination"](items, 2, 1);
      expect(result).toStrictEqual([items[1]]);

      result = await repository["applyPagination"](items, 2, 4);
      expect(result).toStrictEqual([items[4]]);

      result = await repository["applyPagination"](items, 1, 5);
      expect(result).toStrictEqual(items);

      result = await repository["applyPagination"](items, 4, 5);
      expect(result).toHaveLength(0);
    });
  });

  // describe("search", () => {});
});
