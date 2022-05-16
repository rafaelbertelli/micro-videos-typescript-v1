import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import CategoryValidatorFactory from "../validators/category.validator";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type UpdateCategoryProperties = {
  name: string;
  description?: string;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.created_at = this.props.created_at;
  }

  // #region getters and setters
  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(value: string | undefined) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  private set is_active(value: boolean | undefined) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }

  private set created_at(value: Date | undefined) {
    this.props.created_at = value ?? new Date();
  }
  // #endregion

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);

    if (validator.errors) {
      throw new Error(validator.errors.toString());
    }

    return true;
  }

  update(props: UpdateCategoryProperties): Category {
    Category.validate({ name: props.name, description: props.description });

    this.description = props.description;
    this.name = props.name;
    return this;
  }

  activate(): Category {
    this.is_active = true;
    return this;
  }

  deactivate(): Category {
    this.is_active = false;
    return this;
  }
}
