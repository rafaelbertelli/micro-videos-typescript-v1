import Entity from "../entity/entity";
import ValueObject from "./value-object";

type SearchProps<E extends Entity, Filter = string> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter;
};

export default class SearchResult<
  E extends Entity,
  Filter = string
> extends ValueObject {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: Filter;

  constructor(props: SearchProps = {}) {
    super(props);
  }
}
