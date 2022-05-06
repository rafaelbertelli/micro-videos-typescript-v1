import ValueObject from "../value-object";

describe("Value Object abstract class", () => {
  class StubValueObject extends ValueObject {}

  it("should set value", () => {
    // arrange
    const stub2property = { value: "test" };

    // act
    const stub1 = new StubValueObject("test");
    const stub2 = new StubValueObject(stub2property);

    // assert
    expect(stub1.value).toBe("test");
    expect(stub2.value).toStrictEqual(stub2property);
  });
});
