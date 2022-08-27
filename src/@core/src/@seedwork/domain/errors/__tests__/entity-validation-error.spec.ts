import { FieldsErrors } from "#seedwork/domain/validators";
import { EntityValidationError } from "../entity-validation-error";

describe("EntityValidationError", () => {
  it("should assert error", () => {
    const error = new EntityValidationError({ id: ["errado"] });
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(EntityValidationError);
    expect(error.name).toBe("EntityValidationError");
    expect(error.message).toBe("Entity Validation Error");
  });
});
