import ValueObject from "./value-object";

export type SortDirections = "asc" | "desc";

type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirections | null;
  filter?: Filter | null;
};

export default class SearchParams extends ValueObject {
  protected _page: number = 1;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirections | null;
  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
    super(props);
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  // #region getters and setters
  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    const validatedPage = this.validatePage(value, this.page);
    this._page = validatedPage;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    const validatedPage = this.validatePage(value, this.per_page);
    this._per_page = validatedPage;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value?.toString() || null;
  }

  get sort_dir(): SortDirections | null {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
    } else {
      const dir = value?.toString().toLowerCase();
      this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
    }
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value?.toString() || null;
  }
  // #endregion

  private validatePage(page: number, defaultValue: number): number {
    const isNumber = !Number.isNaN(+page);
    const isInteger = parseInt(page?.toString()) === page;
    const isPositive = page > 0;

    if (isNumber && isInteger && isPositive) {
      return page;
    }

    return defaultValue;
  }
}
