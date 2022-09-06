import { IUseCase } from "#seedwork/application/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class DeleteCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    await this.repository.delete(input.id);
  }
}

type Input = {
  id: string;
};

type Output = void;
