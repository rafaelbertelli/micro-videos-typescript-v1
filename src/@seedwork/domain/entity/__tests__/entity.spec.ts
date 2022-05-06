import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../../value-objects/unique-entity-id.vo";
import Entity from "../entity";

describe("Entity", () => {
  class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

  it("should set props and id", () => {
    // arrange
    const props = { prop1: "prop1", prop2: 2 };
    const id = new UniqueEntityId();

    // act
    const entity = new StubEntity(props, id);

    // assert
    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toEqual(id);
  });

  it("should set props and generate id", () => {
    // arrange
    const props = { prop1: "prop1", prop2: 2 };

    // act
    const entity = new StubEntity(props);

    // assert
    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should return toJson result", () => {
    // arrange
    const props = { prop1: "prop1", prop2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(props, id);

    // act
    const json = entity.toJson();

    // assert
    expect(json).toStrictEqual({
      id: id.value,
      ...props,
    });
  });
});
