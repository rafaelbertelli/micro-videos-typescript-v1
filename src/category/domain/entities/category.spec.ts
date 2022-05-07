import { faker } from "@faker-js/faker";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";

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
      it("should auto generate a uuid when it is not passed to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties);

        // assert
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      });

      it("should auto generate a uuid when it is passed null to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties, null);

        // assert
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      });

      it("should auto generate a uuid when it is passed undefined to contructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };

        // act
        const category = new Category(categoryProperties, undefined);

        // assert
        expect(category.uniqueEntityId).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      });

      it("should assert uuid received from constructor", () => {
        // arrange
        const categoryProperties: CategoryProperties = { name };
        const uuid = new UniqueEntityId();

        // act
        const category = new Category(categoryProperties, uuid);

        // assert
        expect(category.uniqueEntityId).toEqual(uuid);
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

  describe("update category tests", () => {
    it("should assert update category", () => {
      // arrange
      const is_active_deny = !is_active;
      const props: CategoryProperties = {
        name,
        description,
        is_active,
        created_at,
      };
      const updateProps: CategoryProperties = {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        is_active: is_active_deny,
        created_at: faker.date.past(),
      };

      // act
      const category = new Category(props);
      category.update(updateProps);

      // assert
      expect(category.name).toEqual(category.name);
      expect(category.description).toEqual(updateProps.description);
      expect(category.created_at).toEqual(category.created_at);
      expect(category.is_active).toEqual(props.is_active);
    });
  });

  describe("activate/deactivate category tests", () => {
    it("should activate category", () => {
      // arrange
      const props: CategoryProperties = {
        name,
        description,
        is_active: false,
        created_at,
      };

      // act
      const category = new Category(props);
      category.activate();

      // assert
      expect(category.name).toEqual(category.name);
      expect(category.description).toEqual(category.description);
      expect(category.created_at).toEqual(category.created_at);
      expect(category.is_active).toBeTruthy();
    });

    it("should deactivate category", () => {
      // arrange
      const props: CategoryProperties = {
        name,
        description,
        is_active: true,
        created_at,
      };

      // act
      const category = new Category(props);
      category.deactivate();

      // assert
      expect(category.name).toEqual(category.name);
      expect(category.description).toEqual(category.description);
      expect(category.created_at).toEqual(category.created_at);
      expect(category.is_active).toBeFalsy();
    });
  });
});
