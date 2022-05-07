import ValidationError from "../errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {
    this.value = value;
    this.property = property;
  }

  static values(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property);
  }

  required(): ValidatorRules {
    const isUndefined = this.value === undefined;
    const isNull = this.value === null;
    const isEmptyString =
      typeof this.value === "string" && this.value.trim() === "";
    const isEmptyList = Array.isArray(this.value) && this.value.length === 0;
    const isEmptyObject =
      typeof this.value === "object" && Object.keys(this.value).length === 0;

    if (
      isUndefined ||
      isNull ||
      isEmptyString ||
      isEmptyList ||
      isEmptyObject
    ) {
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
}
