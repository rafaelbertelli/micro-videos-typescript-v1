import { InUpdate } from 'mvt-core/category/application';

export class UpdateCategoryDto implements Omit<InUpdate, 'id'> {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
}
