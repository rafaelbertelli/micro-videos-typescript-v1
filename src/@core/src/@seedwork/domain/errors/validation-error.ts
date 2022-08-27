import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
