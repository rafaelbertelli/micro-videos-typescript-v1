import { Category } from "#category/domain";
import { CategoryModel } from "../category.model";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel): Category {
    return new Category(model.toJSON());
  }
}
