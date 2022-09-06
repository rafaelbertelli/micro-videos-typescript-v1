import { IUseCase } from "#seedwork/application/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";
import { CategoryOutputMapper } from "../mapper/category-output.mapper";

export class UpdateCategoryUseCase implements IUseCase<InUpdate, OutUpdate> {
  constructor(private repository: CategoryRepository.Repository) {}

  async execute(input: InUpdate): Promise<OutUpdate> {
    const entity = await this.repository.findById(input.id);
    entity.update({ name: input.name, description: input.description });

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    await this.repository.update(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type InUpdate = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type OutUpdate = CategoryOutput;
