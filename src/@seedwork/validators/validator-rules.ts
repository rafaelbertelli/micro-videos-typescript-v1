import ValidationError from "../errors/validation-error";
import { isEmpty } from "./empty-validation";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {
    this.value = value;
    this.property = property;
  }

  static values(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property);
  }

  required(): ValidatorRules {
    if (isEmpty(this.value)) {
      throw new ValidationError(`${this.property} is required`);
    }
    return this;
  }

  string(): ValidatorRules {
    if (typeof this.value !== "string") {
      throw new ValidationError(`${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): ValidatorRules {
    if (this.value.length > max) {
      throw new ValidationError(
        `${this.property} must be less than ${max} characters`
      );
    }
    return this;
  }

  boolean(): ValidatorRules {
    if (typeof this.value !== "boolean") {
      throw new ValidationError(`${this.property} must be a boolean`);
    }
    return this;
  }

  number(): ValidatorRules {
    if (typeof this.value !== "number") {
      throw new ValidationError(`${this.property} must be a number`);
    }
    return this;
  }
}
