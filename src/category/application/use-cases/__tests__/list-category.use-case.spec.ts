import SearchResult from "../../../../@seedwork/domain/value-objects/search-result.vo";
import Category from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";

describe("ListCategoriesUseCase", () => {
  let usecase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    usecase = new ListCategoriesUseCase(repository);
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
});
