import SearchResult from "../search-result.vo";
import { faker } from "@faker-js/faker";

const lastPage = (total: number, perPage: number) => Math.ceil(total / perPage);

describe("SearchResult", () => {
  it("should assert constructor with possible null cases", () => {
    const params = {
      items: [],
      total: faker.datatype.number(),
      current_page: faker.datatype.number(),
      per_page: faker.datatype.number(),
      sort: null,
      sort_dir: null,
      filter: null,
    };
    const last_page = lastPage(params.total, params.per_page);
    const searchResult = new SearchResult(params);

    expect(searchResult.toJSON()).toStrictEqual({
      ...params,
      last_page,
    });
  });

  it("should assert constructor with possible fulfilled cases", () => {
    const params = {
      items: faker.random.arrayElements([
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ]) as any,
      total: faker.datatype.number(),
      current_page: faker.datatype.number(),
      per_page: faker.datatype.number(),
      sort: faker.lorem.word(),
      sort_dir: faker.random.arrayElement(["asc", "desc"]),
      filter: faker.lorem.words(),
    };
    const last_page = lastPage(params.total, params.per_page);
    const searchResult = new SearchResult(params);

    expect(searchResult.toJSON()).toStrictEqual({
      ...params,
      last_page,
    });
  });

  it("should assert last_page calc", () => {
    let params;
    let arrange = [
      {
        total: 10,
        per_page: 10,
        lastPage: 1,
      },
      {
        total: 10,
        per_page: 5,
        lastPage: 2,
      },
      {
        total: 10,
        per_page: 1,
        lastPage: 10,
      },
      {
        total: 17,
        per_page: 2,
        lastPage: 9,
      },
      {
        total: 19,
        per_page: 3,
        lastPage: 7,
      },
    ];

    arrange.forEach((item) => {
      params = {
        items: [],
        total: item.total,
        current_page: 1,
        per_page: item.per_page,
        sort: null,
        sort_dir: null,
        filter: null,
      };
      const searchResult = new SearchResult(params);

      expect(searchResult.toJSON().last_page).toEqual(item.lastPage);
    });
  });
});
