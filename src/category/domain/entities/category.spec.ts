import { Category } from "./category";
import { faker } from "@faker-js/faker";

describe("Category tests", () => {
  let name: string;
  let description: string;
  let is_active: boolean;
  let created_at: Date;

  beforeEach(() => {
    name = faker.name.findName();
    description = faker.lorem.sentence();
    is_active = faker.datatype.boolean();
    created_at = faker.date.past();
  });

  describe("constructor tests", () => {
    it("should assert all constructor props", () => {
      // arrange
      const categoryProperties = { name, description, is_active, created_at };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.is_active).toEqual(is_active);
      expect(category.created_at).toEqual(created_at);
    });

    it("should assert all constructor props with undefined values", () => {
      // arrange
      const categoryProperties = { name, description, is_active };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.is_active).toEqual(is_active);
    });

    it("should assert auto fullfil constructor props when it is not passed", () => {
      // arrange
      const categoryProperties = { name };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).not.toBeUndefined();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("getters tests", () => {
    it("should assert all getters", () => {
      // arrange
      const categoryProperties = { name, description, is_active, created_at };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.created_at).toEqual(created_at);
      expect(category.is_active).toEqual(is_active);
    });
  });
});
