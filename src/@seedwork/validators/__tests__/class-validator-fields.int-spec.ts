import * as libClassValidator from "class-validator";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import ClassValidatorFields from "../class-validator-fields";

class StubRules {
  @MaxLength(189)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<{
  StubRules: StubRules;
}> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe("ClassValidatorFields integration tests", () => {
  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    const validator = new StubClassValidatorFields();

    expect(validator.validate(null)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 189 characters",
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints",
      ],
    });
    expect(spyValidateSync).toHaveBeenCalled();
  });

  it("should validate with no errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    const validator = new StubClassValidatorFields();
    const data = {
      name: "value",
      price: 1,
    };

    expect(validator.validate(data)).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new StubRules(data));
    expect(validator.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });
});
