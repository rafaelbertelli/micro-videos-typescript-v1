import Entity from "../../entity/entity";
import searchParamsVo, {
  SortDirections,
} from "../../value-objects/search-params.vo";
import searchResultVo from "../../value-objects/search-result.vo";
import {
  InMemoryRepository,
  InMemorySearchableRepository,
} from "../in-memory.repository";

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

  // describe("applySort", () => {});

  // describe("applyPagination", () => {});

  // describe("search", () => {});
});
