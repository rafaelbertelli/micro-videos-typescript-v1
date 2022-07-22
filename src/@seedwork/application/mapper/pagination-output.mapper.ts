import { PaginationOutputDto } from "../dto/pagination-output.dto";

export default class PaginationOutputMapper {
  static toPaginationOutput(result: PaginationOutputDto): PaginationOutputDto {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
