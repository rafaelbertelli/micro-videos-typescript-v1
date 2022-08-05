import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid-error";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject {
  constructor(private readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate() {
    if (!uuidValidate(this.value)) {
      throw new InvalidUuidError();
    }
  }
}
