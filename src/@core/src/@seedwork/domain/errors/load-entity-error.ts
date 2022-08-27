import { FieldsErrors } from "#seedwork/domain";

export class LoadEntityError extends Error {
  constructor(public error: FieldsErrors, message?: string) {
    super(message ?? "Entity could not be loaded");
    this.name = "LoadEntityError";
  }
}
