import { NotFoundError } from "../not-found-error";

describe("NotFoundError", () => {
  it("should assert error", () => {
    const error = new NotFoundError("message");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.name).toBe("NotFoundError");
    expect(error.message).toBe("message");
  });
});
