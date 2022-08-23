import { InputListCategory } from 'mvt-core/category/application';
import { SortDirections } from 'mvt-core/@seedwork/domain';

export class SearchCategoryDto implements InputListCategory {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirections;
  filter?: string;
}
