import CategoryValidatorFactory from "../category.validator";

describe("Category validator tests", () => {
  describe("property name", () => {
    it("should validate invalid cases", () => {
      const EMPTY = "name should not be empty";
      const IS_STRING = "name must be a string";
      const MAX_LENGTH = "name must be shorter than or equal to 100 characters";

      const arrange = [
        {
          name: null as any,
          expected: [EMPTY, IS_STRING, MAX_LENGTH],
        },
        {
          name: undefined as any,
          expected: [EMPTY, IS_STRING, MAX_LENGTH],
        },
        {
          name: "" as any,
          expected: [EMPTY],
        },
        {
          name: "a".repeat(101) as any,
          expected: [MAX_LENGTH],
        },
        {
          name: true as any,
          expected: [IS_STRING, MAX_LENGTH],
        },
        {
          name: false as any,
          expected: [IS_STRING, MAX_LENGTH],
        },
        {
          name: new Date() as any,
          expected: [IS_STRING, MAX_LENGTH],
        },
        {
          name: {} as any,
          expected: [IS_STRING, MAX_LENGTH],
        },
        {
          name: [] as any,
          expected: [IS_STRING, MAX_LENGTH],
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(false);
        expect(validator.errors.name).toStrictEqual(item.expected);
      });
    });

    it("should validate valid cases", () => {
      const arrange = [{ name: "Arthur Morgan", expected: [] as any }];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(true);
        expect(validator.errors).toBeNull();
      });
    });
  });

  describe("property description", () => {
    it("should validate invalid cases", () => {
      const IS_STRING = "description must be a string";

      const arrange = [
        {
          name: "Arthur Morgan",
          description: true as any,
          expected: [IS_STRING],
        },
        {
          name: "Arthur Morgan",
          description: false as any,
          expected: [IS_STRING],
        },
        {
          name: "Arthur Morgan",
          description: new Date() as any,
          expected: [IS_STRING],
        },
        {
          name: "Arthur Morgan",
          description: {} as any,
          expected: [IS_STRING],
        },
        {
          name: "Arthur Morgan",
          description: [] as any,
          expected: [IS_STRING],
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(false);
        expect(validator.errors.description).toStrictEqual(item.expected);
      });
    });

    it("should validate valid cases", () => {
      const arrange = [
        {
          name: "Arthur Morgan",
          description: null as any,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          description: undefined as any,
          expected: [],
        },
        {
          name: "Arthur Morgan",
          description: "" as any,
          expected: [],
        },
        {
          name: "Arthur Morgan",
          description: "a".repeat(101) as any,
          expected: [],
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(true);
        expect(validator.errors).toBeNull();
      });
    });
  });

  describe("property is_active", () => {
    it("should validate invalid cases", () => {
      const IS_ACTIVE = "is_active must be a boolean value";

      const arrange = [
        {
          name: "Arthur Morgan",
          is_active: new Date() as any,
          expected: [IS_ACTIVE],
        },
        {
          name: "Arthur Morgan",
          is_active: "    " as any,
          expected: [IS_ACTIVE],
        },
        {
          name: "Arthur Morgan",
          is_active: {} as any,
          expected: [IS_ACTIVE],
        },
        {
          name: "Arthur Morgan",
          is_active: [] as any,
          expected: [IS_ACTIVE],
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(false);
        expect(validator.errors.is_active).toStrictEqual(item.expected);
      });
    });

    it("should validate valid cases", () => {
      const arrange = [
        {
          name: "Arthur Morgan",
          is_active: null,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          is_active: undefined,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          is_active: true,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          is_active: false,
          expected: [] as any,
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(true);
        expect(validator.errors).toBeNull();
      });
    });
  });

  describe("property created_at", () => {
    it("should validate invalid cases", () => {
      const IS_DATE = "created_at must be a Date instance";

      const arrange = [
        {
          name: "Arthur Morgan",
          created_at: "" as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: "    " as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: "15/12/1989" as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: true as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: false as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: {} as any,
          expected: [IS_DATE],
        },
        {
          name: "Arthur Morgan",
          created_at: [] as any,
          expected: [IS_DATE],
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(false);
        expect(validator.errors.created_at).toStrictEqual(item.expected);
      });
    });

    it("should validate valid cases", () => {
      const arrange = [
        {
          name: "Arthur Morgan",
          created_at: null,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          created_at: undefined,
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          created_at: new Date(),
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          created_at: new Date("01/01/1989"),
          expected: [] as any,
        },
        {
          name: "Arthur Morgan",
          created_at: new Date("01/01/1989"),
          expected: [] as any,
        },
      ];

      arrange.forEach((item) => {
        const validator = CategoryValidatorFactory.create();
        const result = validator.validate(item);
        expect(result).toBe(true);
        expect(validator.errors).toBeNull();
      });
    });
  });
});
