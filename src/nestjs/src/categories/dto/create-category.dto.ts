import { InputCreateCategory } from 'mvt-core/category/application';

export class CreateCategoryDto implements InputCreateCategory {
  name: string;
  description?: string;
  is_active?: boolean;
}
