export class EntityValidationError extends Error {
  constructor(message?: string) {
    super(message || "Invalid entity");
    this.name = "EntityValidationError";
  }
}
