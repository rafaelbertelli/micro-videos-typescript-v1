import { EntityValidationError } from "../entity-validation-error";

describe("EntityValidationError", () => {
  it("should assert error", () => {
    const error = new EntityValidationError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(EntityValidationError);
    expect(error.name).toBe("EntityValidationError");
  });

  it("should assert error default message", () => {
    const error = new EntityValidationError();
    expect(error.message).toBe("Invalid entity");
  });

  it("should assert error custom message", () => {
    const error = new EntityValidationError("Custom message");
    expect(error.message).toBe("Custom message");
  });
});
