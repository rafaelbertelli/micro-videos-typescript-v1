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
});
