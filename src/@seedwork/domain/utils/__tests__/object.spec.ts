import { deepFreeze } from "../object";

describe("Object utils", () => {
  it("should assure deep freeze", () => {
    expect.assertions(2);

    // arrange
    const stubProperty = { prop1: "test", prop2: { prop3: "test2" } };
    const stub = deepFreeze(stubProperty);

    // act
    try {
      stub.prop1 = "forbidden";
      stub.prop2.prop3 = "forbidden";
    } catch (error: any) {
      expect(error).toBeInstanceOf(TypeError);
    }

    // assert
    expect(stub).toStrictEqual(stubProperty);
  });
});
