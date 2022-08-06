import PaginationOutputMapper from "../pagination-output.mapper";

describe("PaginationOutputMapper", () => {
  it("should return a mapped pagination", () => {
    const result = {
      items: [] as any,
      total: 10,
      current_page: 1,
      last_page: 10,
      per_page: 10,
      filter: "fake filter",
      sort: "fake sort",
      sort_dir: "fake sort dir",
    };

    const output = PaginationOutputMapper.toOutput(result);

    expect(output).toStrictEqual({
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    });
  });
});
