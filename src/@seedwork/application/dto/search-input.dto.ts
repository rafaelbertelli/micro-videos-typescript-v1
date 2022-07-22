import { SortDirections } from "../../domain/value-objects/search-params.vo";

export type SearchInputDto<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirections | null;
  filter?: Filter | null;
};
