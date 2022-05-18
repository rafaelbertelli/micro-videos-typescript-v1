import Entity from "../../entity/entity";
import UniqueEntityId from "../../value-objects/unique-entity-id.vo";
import InMemoryRepository from "../in-memory-repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository", () => {
  let repo: StubInMemoryRepository;
  let entity1: StubEntity;
  let entity2: StubEntity;
  let entity3: StubEntity;

  beforeEach(async () => {
    repo = new StubInMemoryRepository();
    entity1 = new StubEntity({ name: "test1", price: 1 });
    entity2 = new StubEntity({ name: "test2", price: 2 });
    entity3 = new StubEntity({ name: "test3", price: 3 });

    await repo.insert(entity1);
    await repo.insert(entity2);
    await repo.insert(entity3);
  });

  describe("insert", () => {
    it("should insert a new entity", async () => {
      const result = await repo.findById(entity1.id);
      expect(result).toStrictEqual(entity1);
    });
  });

  describe("findById", () => {
    it("should find an entity by id", async () => {
      const result = await repo.findById(entity2.id);
      expect(result).toStrictEqual(entity2);
    });

    it("should throw an error if entity is not found", async () => {
      await expect(repo.findById("invalid-id")).rejects.toThrow();
    });
  });

  describe("findAll", () => {
    it("should find all entities", async () => {
      const result = await repo.findAll();
      expect(result).toStrictEqual([entity1, entity2, entity3]);
    });
  });

  describe("update", () => {
    it("should update an entity", async () => {
      const foundEntity = await repo.findById(entity1.id);
      expect(foundEntity).toStrictEqual(entity1);

      const entity1Id = entity1.toJSON().id;
      const updatedEntity = new StubEntity(
        {
          name: "updated name",
          price: 89,
        },
        new UniqueEntityId(entity1Id)
      );

      await repo.update(updatedEntity);

      const updatedResult = await repo.findById(entity1.id);
      expect(updatedResult).toStrictEqual(updatedEntity);
    });
  });

  describe("delete", () => {
    it("should delete an entity", async () => {
      const allEntities = await repo.findAll();
      expect(allEntities).toStrictEqual([entity1, entity2, entity3]);

      await repo.delete(entity2.id);

      const deletedResult = await repo.findAll();
      expect(deletedResult).toStrictEqual([entity1, entity3]);

      await expect(repo.findById(entity2.id)).rejects.toThrow();
    });
  });
});
