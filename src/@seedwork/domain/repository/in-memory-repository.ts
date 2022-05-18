import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contracts";

export default abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = id.toString();
    const result = this.items.find((item) => item.id === _id);

    if (!result) {
      throw new Error(`Entity with id ${_id} not found`);
    }

    return result;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = this.elementIndex(entity.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const index = this.elementIndex(id);
    this.items.splice(index, 1);
  }

  elementIndex(id: string | UniqueEntityId): number {
    const _id = id.toString();
    const index = this.items.findIndex((item) => item.id === _id);

    if (index === -1) {
      throw new Error(`Entity with id ${_id} not found`);
    }

    return index;
  }
}
