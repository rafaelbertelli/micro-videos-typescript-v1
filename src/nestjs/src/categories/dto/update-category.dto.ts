import { InputUpdateCategory } from 'mvt-core/category/application';

export class UpdateCategoryDto implements InputUpdateCategory {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
