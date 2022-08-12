import { Category } from "../../../category/domain/entities/category";
import { CategoryOutput } from "../dto/category-output.dto";

export class CategoryOutputMapper {
  static toOutput(category: Category): CategoryOutput {
    return category.toJSON();
  }
}
