import IUseCase from "../../../@seedwork/application/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";
import CategoryOutputMapper from "../mapper/category-output.mapper";

export default class GetCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
};

type Output = CategoryOutput;
