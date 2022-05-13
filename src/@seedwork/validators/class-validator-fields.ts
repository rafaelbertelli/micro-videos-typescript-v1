import { validateSync, ValidationError } from "class-validator";
import ValidatorFieldsInterface, {
  FieldsErrors,
} from "./validator-fields-interface";

export default class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  public errors: FieldsErrors = null;
  public validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const errors: ValidationError[] = validateSync(data);

    if (errors.length > 0) {
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.errors = null;
      this.validatedData = data;
    }

    return !this.errors.length;
  }
}
