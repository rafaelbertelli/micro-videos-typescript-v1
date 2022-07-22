import { CategoryOutput } from "../dto/category-output.dto";
import Category from "../../../category/domain/entities/category";

export default class CategoryOutputMapper {
  static toCategoryOutput(category: Category): CategoryOutput {
    return category.toJSON();
  }
}
