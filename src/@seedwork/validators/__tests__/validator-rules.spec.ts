import ValidationError from "../../errors/validation-error";
import ValidatorRules from "../validator-rules";

describe("ValidatorRules", () => {
  describe("errors method", () => {
    it("should have values method", () => {
      expect(ValidatorRules.values).toBeDefined();
    });

    it("should have required method", () => {
      expect(ValidatorRules.values("xp", "to").required).toBeDefined();
    });

    it("should have string method", () => {
      expect(ValidatorRules.values("xp", "to").string).toBeDefined();
    });

    it("should have maxLength method", () => {
      expect(ValidatorRules.values("xp", "to").maxLength).toBeDefined();
    });
    it("should have boolean method", () => {
      expect(ValidatorRules.values("xp", "to").boolean).toBeDefined();
    });

    it("should have number method", () => {
      expect(ValidatorRules.values("xp", "to").number).toBeDefined();
    });
  });

  describe("error instance", () => {
    it("should throw ValidationError instance", () => {
      expect.assertions(1);

      try {
        ValidatorRules.values(undefined, "to").required();
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
      }
    });
  });

  describe("required", () => {
    it("should throw error if value is undefined", () => {
      expect(() => {
        ValidatorRules.values(undefined, "to").required();
      }).toThrowError();
    });

    it("should throw error if value is null", () => {
      expect(() => {
        ValidatorRules.values(null, "to").required();
      }).toThrowError();
    });

    it("should throw error if value is isEmptyString", () => {
      expect(() => {
        ValidatorRules.values("", "to").required();
      }).toThrowError();

      expect(() => {
        ValidatorRules.values("   ", "to").required();
      }).toThrowError();
    });

    it("should throw error if value is isEmptyList", () => {
      expect(() => {
        ValidatorRules.values([], "to").required();
      }).toThrowError();
    });

    it("should throw error if value is isEmptyObject", () => {
      expect(() => {
        ValidatorRules.values({}, "to").required();
      }).toThrowError();
    });

    it("should not throw error if value is not empty", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").required();
      }).not.toThrowError();
    });
  });

  describe("string", () => {
    it("should throw error if value is not a string", () => {
      expect(() => {
        ValidatorRules.values(1, "to").string();
      }).toThrowError();
    });

    it("should not throw error if value is a string", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").string();
      }).not.toThrowError();
    });
  });

  describe("maxLength", () => {
    it("should throw error if value is greater than max", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").maxLength(5);
      }).toThrowError();
    });

    it("should not throw error if value is less than max", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").maxLength(10);
      }).not.toThrowError();
    });
  });

  describe("boolean", () => {
    it("should throw error if value is not a boolean", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").boolean();
      }).toThrowError();
    });

    it("should not throw error if value is a boolean", () => {
      expect(() => {
        ValidatorRules.values(true, "to").boolean();
      }).not.toThrowError();

      expect(() => {
        ValidatorRules.values(false, "to").boolean();
      }).not.toThrowError();
    });
  });

  describe("number", () => {
    it("should throw error if value is not a number", () => {
      expect(() => {
        ValidatorRules.values("rafael", "to").number();
      }).toThrowError();
    });

    it("should not throw error if value is a number", () => {
      expect(() => {
        ValidatorRules.values(1, "to").number();
      }).not.toThrowError();
    });
  });
});
