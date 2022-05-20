import NotFoundError from "../../errors/not-found-error";
import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const index = await this.elementIndex(id.toString());
    return this.items[index];
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = await this.elementIndex(entity.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const index = await this.elementIndex(id);
    this.items.splice(index, 1);
  }

  protected async elementIndex(id: string | UniqueEntityId): Promise<number> {
    const index = this.items.findIndex((item) => item.id === id.toString());

    if (index === -1) {
      throw new NotFoundError(`Entity with id ${id} not found`);
    }

    return index;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  async search(query: any): Promise<any> {
    return this.items;
  }
}
