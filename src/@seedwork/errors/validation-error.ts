export default class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "Invalid value");
    this.name = "ValidationError";
  }
}
