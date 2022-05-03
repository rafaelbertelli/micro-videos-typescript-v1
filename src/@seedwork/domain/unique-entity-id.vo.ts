import { validate as uuidValidate, v4 as uuidv4 } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid-error";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuidv4();
    this.validate();
  }

  private validate() {
    if (!uuidValidate(this.id)) {
      throw new InvalidUuidError();
    }
  }
}
