import * as libClassValidator from "class-validator";
import ClassValidatorFields from "../class-validator-fields";

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe("ClassValidatorFields tests", () => {
  it("should initialize errors and validatedData with null values", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      {
        property: "field",
        constraints: { isRequired: "Field is required" },
      },
    ]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({
      field: ["Field is required"],
    });
    expect(spyValidateSync).toHaveBeenCalled();
  });

  it("should validate with no errors", () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, "validateSync")
      .mockReturnValue([]);

    const validator = new StubClassValidatorFields();

    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual({ field: "value" });
    expect(validator.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });
});
