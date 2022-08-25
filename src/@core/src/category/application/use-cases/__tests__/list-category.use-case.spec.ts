import { SearchResult } from "#seedwork/domain/value-objects/search-result.vo";
import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory-repository/category-in-memory.repository";
import { ListCategoriesUseCase } from "../list-categories.use-case";

describe("ListCategoriesUseCase", () => {
  let usecase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new ListCategoriesUseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  });

  describe("toOutput method", () => {
    it("should return the expected output with empty items", async () => {
      const searchResult = new SearchResult({
        items: [],
        total: 0,
        current_page: 1,
        per_page: 10,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      const result = usecase["toOutput"](searchResult);

      expect(result).toStrictEqual({
        items: [],
        total: 0,
        current_page: 1,
        last_page: 0,
        per_page: 10,
      });
    });

    it("should return the expected output with items", async () => {
      const entity = new Category({ name: "Category 1" });

      const searchResult = new SearchResult({
        items: [entity],
        total: 0,
        current_page: 1,
        per_page: 10,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      const result = usecase["toOutput"](searchResult);

      expect(result).toStrictEqual({
        items: [entity.toJSON()],
        total: 0,
        current_page: 1,
        last_page: 0,
        per_page: 10,
      });
    });
  });

  describe("execute method", () => {
    let entity1: Category;
    let entity2: Category;
    let entity3: Category;
    let entity4: Category;
    let entity5: Category;
    let entity6: Category;
    let entity7: Category;

    beforeEach(() => {
      const date1 = new Date("2020-01-01");
      const date2 = new Date("2020-01-02");
      const date3 = new Date("2020-01-03");

      entity1 = new Category({ name: "Category 1", created_at: date1 });
      entity2 = new Category({ name: "Category 2", created_at: date2 });
      entity3 = new Category({ name: "Category 3", created_at: date3 });
      entity4 = new Category({ name: "Categories 4", created_at: date3 });
      entity5 = new Category({ name: "Framboesa" });
      entity6 = new Category({ name: "Uva" });
      entity7 = new Category({ name: "Kiwi" });
    });

    it("should return output with categories ordered by desc created_at even when search input is empty", async () => {
      repository.items = [entity1, entity2, entity3];

      const output = await usecase.execute({});

      expect(output).toStrictEqual({
        items: [entity3.toJSON(), entity2.toJSON(), entity1.toJSON()],
        total: 3,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      });
    });

    it("should return output using pagination, orderer and filter", async () => {
      repository.items = [entity1, entity2, entity3];

      const output = await usecase.execute({
        page: 1,
        sort: "created_at",
        sort_dir: "desc",
        filter: "Category",
      });

      expect(output).toStrictEqual({
        items: [entity3.toJSON(), entity2.toJSON(), entity1.toJSON()],
        total: 3,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      });
    });

    it("should return output ordering by asc name", async () => {
      repository.items = [
        entity1,
        entity2,
        entity3,
        entity4,
        entity5,
        entity6,
        entity7,
      ];

      const output = await usecase.execute({
        page: 1,
        sort: "name",
        sort_dir: "asc",
      });

      expect(output).toStrictEqual({
        items: [
          entity4.toJSON(),
          entity1.toJSON(),
          entity2.toJSON(),
          entity3.toJSON(),
          entity5.toJSON(),
          entity7.toJSON(),
          entity6.toJSON(),
        ],
        total: 7,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      });
    });

    it("should return output ordering by desc name", async () => {
      repository.items = [
        entity1,
        entity2,
        entity3,
        entity4,
        entity5,
        entity6,
        entity7,
      ];

      const output = await usecase.execute({
        page: 1,
        sort: "name",
        sort_dir: "desc",
      });

      expect(output).toStrictEqual({
        items: [
          entity6.toJSON(),
          entity7.toJSON(),
          entity5.toJSON(),
          entity3.toJSON(),
          entity2.toJSON(),
          entity1.toJSON(),
          entity4.toJSON(),
        ],
        total: 7,
        current_page: 1,
        last_page: 1,
        per_page: 15,
      });
    });
  });
});
