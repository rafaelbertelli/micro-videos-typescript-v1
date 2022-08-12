import { IUseCase } from "#seedwork/application/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class DeleteCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.repository.findById(input.id);
    await this.repository.delete(entity.id);
  }
}

type Input = {
  id: string;
};

type Output = void;
