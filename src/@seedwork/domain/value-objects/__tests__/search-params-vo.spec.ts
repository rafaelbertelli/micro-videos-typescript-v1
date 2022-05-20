import SearchParams from "../search-params-vo";

describe("SearchParams", () => {
  describe("page prop", () => {
    test("default value", () => {
      const searchParams = new SearchParams();
      expect(searchParams.page).toBe(1);
    });

    test("validate page", () => {
      const arrange = [
        { page: -1, expected: 1 },
        { page: 0, expected: 1 },
        { page: 1, expected: 1 },
        { page: "-1", expected: 1 },
        { page: "0", expected: 1 },
        { page: "1", expected: 1 },
        { page: undefined, expected: 1 },
        { page: null, expected: 1 },
        { page: "", expected: 1 },
        { page: "a", expected: 1 },
        { page: "1a", expected: 1 },
        { page: "1.1", expected: 1 },
        { page: "1.1.1", expected: 1 },
        { page: [] as any, expected: 1 },
        { page: {}, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
        { page: 3, expected: 3 },
      ];

      arrange.forEach((item) => {
        const searchParams = new SearchParams({ page: item.page });
        expect(searchParams.page).toBe(item.expected);
      });
    });
  });

  describe("per_page prop", () => {
    test("default value", () => {
      const searchParams = new SearchParams();
      expect(searchParams.per_page).toBe(15);
    });

    test("validate per_page", () => {
      const arrange = [
        { per_page: -1, expected: 15 },
        { per_page: 0, expected: 15 },
        { per_page: "-1", expected: 15 },
        { per_page: "0", expected: 15 },
        { per_page: "1", expected: 15 },
        { per_page: undefined, expected: 15 },
        { per_page: null, expected: 15 },
        { per_page: "", expected: 15 },
        { per_page: "a", expected: 15 },
        { per_page: "1a", expected: 15 },
        { per_page: "1.1", expected: 15 },
        { per_page: "1.1.1", expected: 15 },
        { per_page: [] as any, expected: 15 },
        { per_page: {}, expected: 15 },
        { per_page: true, expected: 15 },
        { per_page: false, expected: 15 },
        { per_page: 1, expected: 1 },
        { per_page: 2, expected: 2 },
        { per_page: 3, expected: 3 },
      ];

      arrange.forEach((item) => {
        const searchParams = new SearchParams({ per_page: item.per_page });
        expect(searchParams.per_page).toBe(item.expected);
      });
    });
  });

  describe("sort prop", () => {
    test("default value", () => {
      const searchParams = new SearchParams();
      expect(searchParams.sort).toBeNull();
    });

    test("validate sort", () => {
      const arrange = [
        { sort: undefined, expected: null },
        { sort: null, expected: null },
        { sort: "", expected: null as any },
        { sort: "field", expected: "field" },
        { sort: -1, expected: "-1" },
        { sort: 0, expected: "0" },
        { sort: "-1", expected: "-1" },
        { sort: "0", expected: "0" },
        { sort: "1", expected: "1" },
        { sort: "a", expected: "a" },
        { sort: "1a", expected: "1a" },
        { sort: "1.1", expected: "1.1" },
        { sort: "1.1.1", expected: "1.1.1" },
        { sort: [] as any, expected: null as any },
        { sort: {}, expected: "[object Object]" },
        { sort: true, expected: "true" },
        { sort: false, expected: "false" },
        { sort: 1, expected: "1" },
        { sort: 2, expected: "2" },
        { sort: 3, expected: "3" },
      ];

      arrange.forEach((item) => {
        const searchParams = new SearchParams({ sort: item.sort });
        expect(searchParams.sort).toBe(item.expected);
      });
    });
  });

  describe("sort_dir prop", () => {
    test("default value", () => {
      let searchParams;

      searchParams = new SearchParams();
      expect(searchParams.sort_dir).toBeNull();

      searchParams = new SearchParams({ sort: null });
      expect(searchParams.sort_dir).toBeNull();

      searchParams = new SearchParams({ sort: undefined });
      expect(searchParams.sort_dir).toBeNull();

      searchParams = new SearchParams({ sort: "" });
      expect(searchParams.sort_dir).toBeNull();
    });

    test("validate sort_dir", () => {
      const arrange = [
        { sort_dir: "asc", expected: "asc" },
        { sort_dir: "desc", expected: "desc" },
        { sort_dir: "Asc", expected: "asc" },
        { sort_dir: "Desc", expected: "desc" },
        { sort_dir: "ASC", expected: "asc" },
        { sort_dir: "DESC", expected: "desc" },
        { sort_dir: undefined, expected: "asc" },
        { sort_dir: null, expected: "asc" },
        { sort_dir: "", expected: "asc" },
        { sort_dir: "field", expected: "asc" },
        { sort_dir: -1, expected: "asc" },
        { sort_dir: 0, expected: "asc" },
        { sort_dir: "-1", expected: "asc" },
        { sort_dir: "0", expected: "asc" },
        { sort_dir: "1", expected: "asc" },
        { sort_dir: "a", expected: "asc" },
        { sort_dir: "1a", expected: "asc" },
        { sort_dir: "1.1", expected: "asc" },
        { sort_dir: "1.1.1", expected: "asc" },
        { sort_dir: [] as any, expected: "asc" },
        { sort_dir: {}, expected: "asc" },
        { sort_dir: true, expected: "asc" },
        { sort_dir: false, expected: "asc" },
        { sort_dir: 1, expected: "asc" },
        { sort_dir: 2, expected: "asc" },
        { sort_dir: 3, expected: "asc" },
      ];

      arrange.forEach((item) => {
        const searchParams = new SearchParams({
          sort: "name",
          sort_dir: item.sort_dir,
        });
        expect(searchParams.sort_dir).toBe(item.expected);
      });
    });
  });

  describe("filter prop", () => {
    test("default value", () => {
      const searchParams = new SearchParams();
      expect(searchParams.filter).toBeNull();
    });

    test("validate filter", () => {
      const arrange = [
        { filter: undefined, expected: null },
        { filter: null, expected: null },
        { filter: "", expected: null },
        { filter: [] as any, expected: null as any },
        { filter: -1, expected: "-1" },
        { filter: 0, expected: "0" },
        { filter: 1, expected: "1" },
        { filter: "-1", expected: "-1" },
        { filter: "0", expected: "0" },
        { filter: "1", expected: "1" },
        { filter: "a", expected: "a" },
        { filter: "1a", expected: "1a" },
        { filter: "1.1", expected: "1.1" },
        { filter: "1.1.1", expected: "1.1.1" },
        { filter: {}, expected: "[object Object]" },
        { filter: true, expected: "true" },
        { filter: false, expected: "false" },
      ];

      arrange.forEach((item) => {
        const searchParams = new SearchParams({ filter: item.filter });
        expect(searchParams.filter).toBe(item.expected);
      });
    });
  });
});
