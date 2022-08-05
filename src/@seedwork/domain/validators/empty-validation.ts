export function isEmpty(value: any) {
  const isNull = value === null;
  const isUndefined = value === undefined;
  const isEmptyString = typeof value === "string" && value.trim() === "";
  const isEmptyList = Array.isArray(value) && value.length === 0;
  const isEmptyObject =
    typeof value === "object" &&
    !(value instanceof Date) &&
    value !== null &&
    Object.keys(value).length === 0;

  return [isUndefined, isNull, isEmptyString, isEmptyList, isEmptyObject].some(
    Boolean
  );
}
