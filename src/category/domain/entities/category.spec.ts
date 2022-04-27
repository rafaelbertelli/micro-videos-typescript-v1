import { faker } from "@faker-js/faker";
import { Category, CategoryProperties } from "./category";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";

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
    it("should assert all constructor categoryProperties", () => {
      // arrange
      const categoryProperties: CategoryProperties = {
        name,
        description,
        is_active,
        created_at,
      };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.is_active).toEqual(is_active);
      expect(category.created_at).toEqual(created_at);
    });

    it("should assert all constructor categoryProperties with undefined values", () => {
      // arrange
      const categoryProperties: CategoryProperties = {
        name,
        description,
        is_active,
      };

      // act
      const category = new Category(categoryProperties);

      // assert
      expect(category).toBeInstanceOf(Category);
      expect(category.name).toEqual(name);
      expect(category.description).toEqual(description);
      expect(category.is_active).toEqual(is_active);
    });

    it("should assert auto fullfil constructor categoryProperties when it is not passed", () => {
      // arrange
      const categoryProperties: CategoryProperties = { name };

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

    describe("uuid tests", () => {
      it("should auto generate a valid uuid when it is not passed to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties);

        // assert
        expect(category.id).not.toBeNull();
        expect(uuidValidate(category.id)).toBeTruthy();
      });

      it("should auto generate a valid uuid when it is passed null to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties, null);

        // assert
        expect(category.id).not.toBeNull();
        expect(uuidValidate(category.id)).toBeTruthy();
      });

      it("should auto generate a valid uuid when it is passed undefined to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties, undefined);

        // assert
        expect(category.id).not.toBeNull();
        expect(uuidValidate(category.id)).toBeTruthy();
      });

      it("should assert uuid received from constructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };
        const uuid = uuidv4();

        // act
        const category = new Category(categoryProperties, uuid);

        // assert
        expect(category.id).toEqual(uuid);
      });
    });
  });

  describe("getters tests", () => {
    it("should assert all getters", () => {
      // arrange
      const categoryProperties: CategoryProperties = {
        name,
        description,
        is_active,
        created_at,
      };

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
