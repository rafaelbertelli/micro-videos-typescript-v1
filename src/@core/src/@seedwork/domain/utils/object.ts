export function deepFreeze<T>(obj: T) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach((name) => {
    const value = obj[name as keyof T];

    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}
