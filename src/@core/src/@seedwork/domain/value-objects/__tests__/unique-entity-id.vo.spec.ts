import { v4 as uuidv4 } from "uuid";
import { InvalidUuidError } from "../../errors/invalid-uuid-error";
import { UniqueEntityId } from "../unique-entity-id.vo";

describe("Unique Entity Id Value Object", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  describe("constructor", () => {
    it("should throw UniqueEntityId Error when uuid is not valid", () => {
      // arrange
      const uuid = "123";

      // act
      const action = () => new UniqueEntityId(uuid);

      // assert
      expect(action).toThrowError(InvalidUuidError);
      expect(validateSpy).toBeCalledTimes(1);
    });

    it("should assert uuid received from constructor", () => {
      // arrange
      const uuid = uuidv4();

      // act
      const uniqueEntityId = new UniqueEntityId(uuid);

      // assert
      expect(uniqueEntityId.value).toEqual(uuid);
      expect(validateSpy).toBeCalledTimes(1);
    });

    it("should create uuid when it is not passed to contructor", () => {
      // act
      const uniqueEntityId = new UniqueEntityId();

      // assert
      expect(uniqueEntityId.value).not.toBeNull();
      expect(validateSpy).toBeCalledTimes(1);
    });
  });
});
