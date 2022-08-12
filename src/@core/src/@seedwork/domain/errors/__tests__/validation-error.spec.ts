import { ValidationError } from "../validation-error";

describe("ValidationError", () => {
  it("should assert error", () => {
    const error = new ValidationError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.name).toBe("ValidationError");
  });

  it("should assert error default message", () => {
    const error = new ValidationError();
    expect(error.message).toBe("Invalid value");
  });

  it("should assert error custom message", () => {
    const error = new ValidationError("Custom message");
    expect(error.message).toBe("Custom message");
  });
});
