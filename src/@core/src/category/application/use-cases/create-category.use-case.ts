import IUseCase from "../../../@seedwork/application/use-case.interface";
import Category from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";

export default class CreateCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);

    await this.repository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

type Output = CategoryOutput;
