import { IUseCase } from "#seedwork/application/use-case.interface";
import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";

export class CreateCategoryUseCase
  implements IUseCase<InputCreateCategory, OutputCreateCategory>
{
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: InputCreateCategory): Promise<OutputCreateCategory> {
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

export type InputCreateCategory = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type OutputCreateCategory = CategoryOutput;
