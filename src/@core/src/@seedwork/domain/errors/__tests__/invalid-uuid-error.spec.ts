import InvalidUuidError from "../invalid-uuid-error";

describe("InvalidUuidError", () => {
  it("should assert error", () => {
    const error = new InvalidUuidError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(InvalidUuidError);
    expect(error.name).toBe("InvalidUuidError");
  });

  it("should assert error default message", () => {
    const error = new InvalidUuidError();
    expect(error.message).toBe("Id must be a valid UUID");
  });

  it("should assert error custom message", () => {
    const error = new InvalidUuidError("Custom message");
    expect(error.message).toBe("Custom message");
  });
});
