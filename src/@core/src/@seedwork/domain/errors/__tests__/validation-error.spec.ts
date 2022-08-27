import { ValidationError } from "../validation-error";

describe("ValidationError", () => {
  it("should assert error", () => {
    const error = new ValidationError({ id: ["errado"] });
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Validation Error");
  });
});
