import { deepFreeze } from "../utils/object";
export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString = () => {
    try {
      if (this.value === undefined || this.value === null) {
        return "";
      }

      if (typeof this.value === "string") {
        return this.value;
      }

      if (typeof this.value === "object") {
        return this.value.toString();
      }

      return this.value.toString();
    } catch (error) {
      return this.value + "";
    }
  };
}
