import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Validation Error");
    this.name = "ValidationError";
  }
}
