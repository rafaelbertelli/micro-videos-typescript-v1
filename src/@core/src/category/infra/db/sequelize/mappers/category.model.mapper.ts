import { Category } from "#category/domain";
import { EntityValidationError, LoadEntityError } from "#seedwork/domain";
import { CategoryModel } from "../category.model";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel): Category {
    try {
      return new Category(model.toJSON());
    } catch (e: any) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
