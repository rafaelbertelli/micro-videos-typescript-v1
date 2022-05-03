import InvalidUuidError from "../errors/invalid-uuid-error";
import UniqueEntityId from "./unique-entity-id.vo";

describe("Unique Entity Id Value Object", () => {
  describe("constructor", () => {
    it("should throw UniqueEntityId Error when uuid is not valid", () => {
      // arrange
      const uuid = "123";

      // act
      const action = () => new UniqueEntityId(uuid);

      // assert
      expect(action).toThrowError(InvalidUuidError);
    });

    it("should call validate method", () => {
      // arrange
      const uuid = "123";
      const validateSpy = jest.spyOn(
        UniqueEntityId.prototype as any,
        "validate"
      );

      // act
      const action = () => new UniqueEntityId(uuid);

      // assert
      expect(action).toThrowError(InvalidUuidError);
      expect(validateSpy).toHaveBeenCalled();
    });

    it("should assert uuid received from constructor", () => {
      // arrange
      const { id: uuid } = new UniqueEntityId();

      // act
      const uniqueEntityId = new UniqueEntityId(uuid);

      // assert
      expect(uniqueEntityId.id).toEqual(uuid);
    });

    it("should create uuid when it is not passed to contructor", () => {
      // act
      const uniqueEntityId = new UniqueEntityId();

      // assert
      expect(uniqueEntityId.id).not.toBeNull();
    });
  });
});
