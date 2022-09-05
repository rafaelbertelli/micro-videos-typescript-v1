import { Category } from "#category/domain";
import { NotFoundError, SearchResult, UniqueEntityId } from "#seedwork/domain";
import { SearchParams } from "#seedwork/domain/value-objects/search-params.vo";
import { setupSequelize } from "#seedwork/infra/db/testing/setup-sequelize";
import faker from "@faker-js/faker";
import { CategorySequelize } from "../category-sequelize";

describe("Category Sequelize Repository", () => {
  setupSequelize({ models: [CategorySequelize.CategoryModel] });
  let repository: CategorySequelize.CategorySequelizeRepository;

  const category_A = new Category(
    {
      name: "Test A",
      created_at: new Date("2020-01-01"),
    },
    new UniqueEntityId()
  );
  const category_B = new Category(
    {
      name: "TEST B",
      created_at: new Date("2022-01-01"),
    },
    new UniqueEntityId()
  );
  const category_C = new Category(
    {
      name: "C",
      created_at: new Date("2019-01-01"),
    },
    new UniqueEntityId()
  );
  const category_D = new Category(
    {
      name: "Teste D",
      created_at: new Date("2021-01-01"),
    },
    new UniqueEntityId()
  );

  beforeEach(() => {
    repository = new CategorySequelize.CategorySequelizeRepository(
      CategorySequelize.CategoryModel
    );
  });

  describe("sortableFields", () => {
    it("should verify defined sortable fields", () => {
      expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);
    });
  });

  describe("insert", () => {
    it("should insert a new entity", async () => {
      const categories = await CategorySequelize.CategoryModel.bulkCreate([
        category_A.toJSON(),
        category_B.toJSON(),
      ]);

      const resultA = await CategorySequelize.CategoryModel.findByPk(
        categories[0].id
      );
      const resultB = await CategorySequelize.CategoryModel.findByPk(
        categories[1].id
      );

      expect(resultA.toJSON()).toStrictEqual(category_A.toJSON());
      expect(resultB.toJSON()).toStrictEqual(category_B.toJSON());
    });
  });

  describe("findById", () => {
    it("should throw an error if entity is not found", async () => {
      await expect(repository.findById("invalid-id")).rejects.toThrow(
        new NotFoundError(`Entity with id invalid-id not found`)
      );
    });

    it("should find an entity by id", async () => {
      const category = new Category({ name: "Teste" });
      const { id, uniqueEntityId } = category;

      await repository.insert(category);
      const model_id = await repository.findById(id);
      const model_UID = await repository.findById(uniqueEntityId);

      expect(model_id.toJSON()).toStrictEqual(category.toJSON());
      expect(model_UID.toJSON()).toStrictEqual(category.toJSON());
    });
  });

  describe("findAll", () => {
    it("should return all categories", async () => {
      const category = new Category({ name: "Teste" });
      await repository.insert(category);

      const result = await repository.findAll();

      expect(result).toHaveLength(1);
      expect(JSON.stringify(result)).toStrictEqual(JSON.stringify([category]));
    });
  });

  describe("search", () => {
    it("should call CategoryModelMapper.toEntity to each item from result", async () => {
      const spyOnCategoryModelMapper = jest.spyOn(
        CategorySequelize.CategoryModelMapper,
        "toEntity"
      );

      await CategorySequelize.CategoryModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: faker.datatype.uuid(),
          name: faker.internet.userName(),
          description: faker.lorem.paragraph(),
          is_active: faker.datatype.boolean(),
          created_at: faker.date.past(),
        }));

      const searchParams: SearchParams = new SearchParams();
      await repository.search(searchParams);

      expect(spyOnCategoryModelMapper).toHaveBeenCalledTimes(15);
    });

    it("should return default pagination when it is not full defined on searchParams", async () => {
      await CategorySequelize.CategoryModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: faker.datatype.uuid(),
          name: faker.internet.userName(),
          description: faker.lorem.paragraph(),
          is_active: faker.datatype.boolean(),
          created_at: faker.date.past(),
        }));

      const searchParams: SearchParams = new SearchParams();
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);
      expect(result.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        per_page: 15,
        last_page: 2,
        sort: "created_at",
        sort_dir: null,
        filter: null,
      });

      result.items.map((item) => {
        expect(item).toBeInstanceOf(Category);
        expect(item.id).toBeDefined();
      });
    });

    it("should return result ordered by created_at DESC when searchParams is null", async () => {
      const category_A = new Category({
        name: "A",
        description: null,
        is_active: true,
        created_at: new Date("2020-01-01"),
      });
      const category_B = new Category({
        name: "B",
        created_at: new Date("2022-01-01"),
      });
      const category_C = new Category({
        name: "C",
        created_at: new Date("2019-01-01"),
      });
      const category_D = new Category({
        name: "D",
        created_at: new Date("2021-01-01"),
      });

      await repository.insert(category_A);
      await repository.insert(category_B);
      await repository.insert(category_C);
      await repository.insert(category_D);

      const searchParams: SearchParams = new SearchParams({});
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);

      expect(result.items[0].toJSON()).toStrictEqual(category_B.toJSON());
      expect(result.items[1].toJSON()).toStrictEqual(category_D.toJSON());
      expect(result.items[2].toJSON()).toStrictEqual(category_A.toJSON());
      expect(result.items[3].toJSON()).toStrictEqual(category_C.toJSON());

      expect(result.toJSON()).toMatchObject({
        total: 4,
        current_page: 1,
        per_page: 15,
        last_page: 1,
        sort: "created_at",
        sort_dir: null,
        filter: null,
      });
    });

    it("should return result ordered by specified created_at DESC and correct pagination params", async () => {
      const category_A = new Category({
        name: "A",
        description: null,
        is_active: true,
        created_at: new Date("2020-01-01"),
      });
      const category_B = new Category({
        name: "B",
        created_at: new Date("2022-01-01"),
      });
      const category_C = new Category({
        name: "C",
        created_at: new Date("2019-01-01"),
      });
      const category_D = new Category({
        name: "D",
        created_at: new Date("2021-01-01"),
      });

      await repository.insert(category_A);
      await repository.insert(category_B);
      await repository.insert(category_C);
      await repository.insert(category_D);

      const searchParams: SearchParams = new SearchParams({
        sort_dir: "desc",
        sort: "created_at",
      });
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);

      expect(result.items[0].toJSON()).toStrictEqual(category_B.toJSON());
      expect(result.items[1].toJSON()).toStrictEqual(category_D.toJSON());
      expect(result.items[2].toJSON()).toStrictEqual(category_A.toJSON());
      expect(result.items[3].toJSON()).toStrictEqual(category_C.toJSON());

      expect(result.toJSON()).toMatchObject({
        total: 4,
        current_page: 1,
        per_page: 15,
        last_page: 1,
        sort: "created_at",
        sort_dir: "desc",
        filter: null,
      });
    });

    it("should return result ordered by specified created_at ASC and correct pagination params", async () => {
      const category_A = new Category({
        name: "A",
        description: null,
        is_active: true,
        created_at: new Date("2020-01-01"),
      });
      const category_B = new Category({
        name: "B",
        created_at: new Date("2022-01-01"),
      });
      const category_C = new Category({
        name: "C",
        created_at: new Date("2019-01-01"),
      });
      const category_D = new Category({
        name: "D",
        created_at: new Date("2021-01-01"),
      });

      await repository.insert(category_A);
      await repository.insert(category_B);
      await repository.insert(category_C);
      await repository.insert(category_D);

      const searchParams: SearchParams = new SearchParams({
        sort_dir: "asc",
        sort: "created_at",
      });
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);

      expect(result.items[0].toJSON()).toStrictEqual(category_C.toJSON());
      expect(result.items[1].toJSON()).toStrictEqual(category_A.toJSON());
      expect(result.items[2].toJSON()).toStrictEqual(category_D.toJSON());
      expect(result.items[3].toJSON()).toStrictEqual(category_B.toJSON());

      expect(result.toJSON()).toMatchObject({
        total: 4,
        current_page: 1,
        per_page: 15,
        last_page: 1,
        sort: "created_at",
        sort_dir: "asc",
        filter: null,
      });
    });

    it("should return result ordered by specified name ASC and correct pagination params", async () => {
      const category_A = new Category({
        name: "A",
        description: null,
        is_active: true,
        created_at: new Date("2020-01-01"),
      });
      const category_B = new Category({
        name: "B",
        created_at: new Date("2022-01-01"),
      });
      const category_C = new Category({
        name: "C",
        created_at: new Date("2019-01-01"),
      });
      const category_D = new Category({
        name: "D",
        created_at: new Date("2021-01-01"),
      });

      await repository.insert(category_A);
      await repository.insert(category_B);
      await repository.insert(category_C);
      await repository.insert(category_D);

      const searchParams: SearchParams = new SearchParams({
        sort_dir: "asc",
        sort: "name",
      });
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);

      expect(result.items[0].toJSON()).toStrictEqual(category_A.toJSON());
      expect(result.items[1].toJSON()).toStrictEqual(category_B.toJSON());
      expect(result.items[2].toJSON()).toStrictEqual(category_C.toJSON());
      expect(result.items[3].toJSON()).toStrictEqual(category_D.toJSON());

      expect(result.toJSON()).toMatchObject({
        total: 4,
        current_page: 1,
        per_page: 15,
        last_page: 1,
        sort: "name",
        sort_dir: "asc",
        filter: null,
      });
    });

    it("should return result ordered by specified name DESC and correct pagination params", async () => {
      const category_A = new Category({
        name: "A",
        description: null,
        is_active: true,
        created_at: new Date("2020-01-01"),
      });
      const category_B = new Category({
        name: "B",
        created_at: new Date("2022-01-01"),
      });
      const category_C = new Category({
        name: "C",
        created_at: new Date("2019-01-01"),
      });
      const category_D = new Category({
        name: "D",
        created_at: new Date("2021-01-01"),
      });

      await repository.insert(category_A);
      await repository.insert(category_B);
      await repository.insert(category_C);
      await repository.insert(category_D);

      const searchParams: SearchParams = new SearchParams({
        sort_dir: "desc",
        sort: "name",
      });
      const result = await repository.search(searchParams);

      expect(result).toBeInstanceOf(SearchResult);

      expect(result.items[0].toJSON()).toStrictEqual(category_D.toJSON());
      expect(result.items[1].toJSON()).toStrictEqual(category_C.toJSON());
      expect(result.items[2].toJSON()).toStrictEqual(category_B.toJSON());
      expect(result.items[3].toJSON()).toStrictEqual(category_A.toJSON());

      expect(result.toJSON()).toMatchObject({
        total: 4,
        current_page: 1,
        per_page: 15,
        last_page: 1,
        sort: "name",
        sort_dir: "desc",
        filter: null,
      });
    });

    it("should order by created_at DESC when search params are null", async () => {
      const created_at = new Date();
      await CategorySequelize.CategoryModel.factory()
        .count(16)
        .bulkCreate((index) => ({
          id: faker.datatype.uuid(),
          name: `Movie${index}`,
          description: null,
          is_active: true,
          created_at: new Date(created_at.getTime() + 100 + index),
        }));
      const searchOutput = await repository.search(new SearchParams());
      const items = searchOutput.items;
      [...items].reverse().forEach((item, index) => {
        expect(`${item.name}${index + 1}`);
      });
    });

    it("should assert search with pagination and filter", async () => {
      const defaultProps = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };

      const categoriesProps = [
        { id: faker.datatype.uuid(), name: "test", ...defaultProps },
        { id: faker.datatype.uuid(), name: "aaaa", ...defaultProps },
        { id: faker.datatype.uuid(), name: "AAAA", ...defaultProps },
        { id: faker.datatype.uuid(), name: "TEST", ...defaultProps },
        { id: faker.datatype.uuid(), name: "fake", ...defaultProps },
        { id: faker.datatype.uuid(), name: "TeSt", ...defaultProps },
      ];

      const categories = await CategorySequelize.CategoryModel.bulkCreate(
        categoriesProps
      );

      let result = await repository.search(
        new SearchParams({ page: 1, per_page: 2, filter: "TEST" })
      );

      let expected = new SearchResult({
        items: [
          CategorySequelize.CategoryModelMapper.toEntity(categories[0]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[3]),
        ],
        total: 3,
        current_page: 1,
        per_page: 2,
        sort: "created_at",
        sort_dir: null,
        filter: "TEST",
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );

      result = await repository.search(
        new SearchParams({ page: 2, per_page: 2, filter: "TEST" })
      );

      expected = new SearchResult({
        items: [CategorySequelize.CategoryModelMapper.toEntity(categories[5])],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: "created_at",
        sort_dir: null,
        filter: "TEST",
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );
    });

    it("should search by created_at when given sort dont belong to its initial values", async () => {
      const categories = await CategorySequelize.CategoryModel.bulkCreate([
        category_B.toJSON(),
        category_A.toJSON(),
        category_D.toJSON(),
        category_C.toJSON(),
      ]);

      let result = await repository.search(
        new SearchParams({ sort: "description", sort_dir: "desc" })
      );

      let expected = new SearchResult({
        items: [
          CategorySequelize.CategoryModelMapper.toEntity(categories[0]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[2]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[1]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[3]),
        ],
        total: 4,
        current_page: 1,
        per_page: 15,
        sort: "created_at",
        sort_dir: "desc",
        filter: null,
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );
    });

    it("should assert search with pagination and sort", async () => {
      const defaultProps = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };

      const categoriesProps = [
        { id: faker.datatype.uuid(), name: "b", ...defaultProps },
        { id: faker.datatype.uuid(), name: "a", ...defaultProps },
        { id: faker.datatype.uuid(), name: "d", ...defaultProps },
        { id: faker.datatype.uuid(), name: "e", ...defaultProps },
        { id: faker.datatype.uuid(), name: "c", ...defaultProps },
      ];

      const categories = await CategorySequelize.CategoryModel.bulkCreate(
        categoriesProps
      );

      let result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 3,
          sort: "name",
          sort_dir: "asc",
        })
      );

      let expected = new SearchResult({
        items: [
          CategorySequelize.CategoryModelMapper.toEntity(categories[1]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[0]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[4]),
        ],
        total: 5,
        current_page: 1,
        per_page: 3,
        sort: "name",
        sort_dir: "asc",
        filter: null,
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );

      result = await repository.search(
        new SearchParams({
          page: 1,
          per_page: 3,
          sort: "name",
          sort_dir: "desc",
        })
      );

      expected = new SearchResult({
        items: [
          CategorySequelize.CategoryModelMapper.toEntity(categories[3]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[2]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[4]),
        ],
        total: 5,
        current_page: 1,
        per_page: 3,
        sort: "name",
        sort_dir: "desc",
        filter: null,
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );
    });

    it("should search using sort, sort_dir and filter", async () => {
      const categories = await CategorySequelize.CategoryModel.bulkCreate([
        category_A.toJSON(),
        category_B.toJSON(),
        category_C.toJSON(),
        category_D.toJSON(),
      ]);

      let result = await repository.search(
        new SearchParams({ sort: "name", sort_dir: "desc", filter: "teste" })
      );

      let expected = new SearchResult({
        items: [CategorySequelize.CategoryModelMapper.toEntity(categories[3])],
        total: 1,
        current_page: 1,
        per_page: 15,
        sort: "name",
        sort_dir: "desc",
        filter: "teste",
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );

      result = await repository.search(
        new SearchParams({ sort: "name", sort_dir: "desc", filter: "test" })
      );

      expected = new SearchResult({
        items: [
          CategorySequelize.CategoryModelMapper.toEntity(categories[3]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[0]),
          CategorySequelize.CategoryModelMapper.toEntity(categories[1]),
        ],
        total: 3,
        current_page: 1,
        per_page: 15,
        sort: "name",
        sort_dir: "desc",
        filter: "test",
      });

      expect(result.toJSON({ forceEntity: true })).toMatchObject(
        expected.toJSON({ forceEntity: true })
      );
    });
  });
});
