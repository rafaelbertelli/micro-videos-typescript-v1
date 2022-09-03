import { isEmpty } from "../empty-validation";

describe("empty validation", () => {
  describe("should test boolean return of empty validation", () => {
    const is = {
      EMPTY: true,
      NOT_EMPTY: false,
    };

    const arrange = [
      { value: undefined, expected: is.EMPTY },
      { value: null, expected: is.EMPTY },
      { value: "", expected: is.EMPTY },
      { value: "   ", expected: is.EMPTY },
      { value: "uatemsomdiu", expected: is.NOT_EMPTY },
      { value: "uatemsomdiu   ", expected: is.NOT_EMPTY },
      { value: "   uatemsomdiu", expected: is.NOT_EMPTY },
      { value: [], expected: is.EMPTY },
      { value: [1, 2, 3], expected: is.NOT_EMPTY },
      { value: {}, expected: is.EMPTY },
      { value: { a: 1, b: 2 }, expected: is.NOT_EMPTY },
      { value: true, expected: is.NOT_EMPTY },
      { value: false, expected: is.NOT_EMPTY },
      { value: 1, expected: is.NOT_EMPTY },
      { value: 0, expected: is.NOT_EMPTY },
      { value: -1, expected: is.NOT_EMPTY },
      { value: -0, expected: is.NOT_EMPTY },
      { value: -1.1, expected: is.NOT_EMPTY },
      { value: -0.1, expected: is.NOT_EMPTY },
      { value: 1.1, expected: is.NOT_EMPTY },
      { value: 0.1, expected: is.NOT_EMPTY },
      { value: new Date(), expected: is.NOT_EMPTY },
    ];

    test.each(arrange)("validate %o", ({ value, expected }) => {
      expect(isEmpty(value)).toBe(expected);
    });
  });
});
