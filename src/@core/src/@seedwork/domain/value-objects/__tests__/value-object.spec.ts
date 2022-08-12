import { ValueObject } from "../value-object";

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

  it("should return string representation", () => {
    // arrange
    const stub1property = "test";
    const stub2property = { value: "test" };
    const stub3property = ["test", "test2"];
    const stub4property = { value: ["test", "test2"] };
    const stub5property: undefined = undefined;
    const stub6property: null = null;
    const stub7property = new Date();

    // act
    const stub1 = new StubValueObject(stub1property);
    const stub2 = new StubValueObject(stub2property);
    const stub3 = new StubValueObject(stub3property);
    const stub4 = new StubValueObject(stub4property);
    const stub5 = new StubValueObject(stub5property);
    const stub6 = new StubValueObject(stub6property);
    const stub7 = new StubValueObject(stub7property);

    // assert
    expect(stub1.toString()).toStrictEqual(stub1property.toString());
    expect(stub2.toString()).toStrictEqual(stub2property.toString());
    expect(stub3.toString()).toStrictEqual(stub3property.toString());
    expect(stub4.toString()).toStrictEqual(stub4property.toString());
    expect(stub5.toString()).toStrictEqual("");
    expect(stub6.toString()).toStrictEqual("");
    expect(stub7.toString()).toStrictEqual(stub7property.toString());
  });

  it("should assure string immutability", () => {
    expect.assertions(2);

    // arrange
    const stubProperty = "go go go";
    const stub = new StubValueObject(stubProperty);

    // act
    try {
      stub.value.prop1 = "forbidden";
    } catch (error: any) {
      expect(error).toBeInstanceOf(TypeError);
    }

    // assert
    expect(stub.value).toStrictEqual(stubProperty);
  });

  it("should assure object immutability", () => {
    expect.assertions(2);

    // arrange
    const stubProperty = { prop1: "test", prop2: "test2" };
    const stub = new StubValueObject(stubProperty);

    // act
    try {
      stub.value.prop1 = "forbidden";
    } catch (error: any) {
      expect(error).toBeInstanceOf(TypeError);
    }

    // assert
    expect(stub.value).toStrictEqual(stubProperty);
  });

  it("should assure deep object immutability", () => {
    expect.assertions(2);

    // arrange
    const stubProperty = { prop1: "test", prop2: { prop3: new Date() } };
    const stub = new StubValueObject(stubProperty);

    // act
    try {
      stub.value.prop2.prop3 = "forbidden";
    } catch (error: any) {
      expect(error).toBeInstanceOf(TypeError);
    }

    // assert
    expect(stub.value).toStrictEqual(stubProperty);
  });
});
