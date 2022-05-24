import _ from "lodash";
import Entity from "../../entity/entity";
import SearchParams from "../../value-objects/search-params.vo";
import SearchResult from "../../value-objects/search-result.vo";
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

  describe("search", () => {
    it("should assert search using default SearchParams", async () => {
      const entity = new StubEntity({ name: "a", price: 1 });
      const items = Array(16).fill(entity);

      repository.items = items;
      const result = await repository.search(new SearchParams());

      expect(result.toJSON()).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        }).toJSON()
      );
    });

    it("should assert search with fulfilled SearchParams", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "a", price: 5 }),
        new StubEntity({ name: "A", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
        new StubEntity({ name: "TesT", price: 0 }),
      ];

      repository.items = items;

      let result: any = (
        await repository.search(
          new SearchParams({ page: 2, per_page: 2, filter: "TEST" })
        )
      ).toJSON();
      result = _.omit(result, ["items"]);

      let expected: any = new SearchResult({
        items: [items[2]],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: "TEST",
      }).toJSON();
      expected = _.omit(expected, ["items"]);

      expect(result).toStrictEqual(expected);
    });

    it("should assert search with fulfilled SearchParams with sort asc", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "c", price: 5 }),
        new StubEntity({ name: "a", price: 5 }),
      ];

      repository.items = items;

      const result: any = (
        await repository.search(
          new SearchParams({
            page: 1,
            per_page: 3,
            sort: "name",
            sort_dir: "asc",
          })
        )
      ).toJSON();

      expect(result.items).toStrictEqual([items[2], items[0], items[1]]);
    });

    it("should assert search with fulfilled SearchParams with sort desc", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "c", price: 5 }),
        new StubEntity({ name: "a", price: 5 }),
      ];

      repository.items = items;

      const result: any = (
        await repository.search(
          new SearchParams({
            page: 1,
            per_page: 3,
            sort: "name",
            sort_dir: "desc",
          })
        )
      ).toJSON();

      expect(result.items).toStrictEqual([items[1], items[0], items[2]]);
    });
  });
});
