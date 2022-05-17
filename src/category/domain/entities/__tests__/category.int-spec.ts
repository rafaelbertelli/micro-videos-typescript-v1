import { faker } from "@faker-js/faker";
import EntityValidationError from "../../../../@seedwork/errors/entity-validation-error";
import { Category, CategoryProperties } from "../category";

describe("Category tests", () => {
  let name: string;
  let description: string;
  let is_active: boolean;
  let created_at: Date;
  let categoryProperties: CategoryProperties;

  beforeEach(() => {
    name = faker.name.findName();
    description = faker.lorem.sentence();
    is_active = faker.datatype.boolean();
    created_at = faker.date.past();
    categoryProperties = { name, description, is_active, created_at };
  });

  describe("Category.validate", () => {
    it("should validate with success", () => {
      const result = Category.validate(categoryProperties);
      expect(result).toBeTruthy();
    });

    it("should throw error when validation fails", () => {
      expect(() =>
        Category.validate({ ...categoryProperties, name: "" })
      ).toThrowError(EntityValidationError);
    });
  });
});
