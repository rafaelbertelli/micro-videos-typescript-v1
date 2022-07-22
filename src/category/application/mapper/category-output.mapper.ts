import { CategoryOutput } from "../dto/category-output.dto";

export default class CategoryOutputMapper {
  static toCategoryOutput(category: CategoryOutput): CategoryOutput {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    };
  }
}
