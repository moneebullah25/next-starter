const toString = Object.prototype.toString;

/**
 *
 * @param value Any value
 * @returns The string representation of the value
 */
export function asStringPrototype(value: any): string {
  return toString.call(value);
}

/**
 *
 * @param value Any value
 * @returns If the value is an array
 */
export function isArray<T = any>(value: any): value is T[] {
  return toString.call(value) === "[object Array]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a pure object
 */
export function isObject(value: any): value is object {
  return toString.call(value) === "[object Object]";
}

/**
 *
 * @param value Any value
 * @returns If the value is an object like
 */
export function isObjectLike(value: any): value is object {
  return value !== null && typeof value === "object";
}

/**
 *
 * @param value Any value
 * @returns If the value is a date
 */
export function isDate(value: any): value is Date {
  return toString.call(value) === "[object Date]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

/**
 *
 * @param value Any value
 * @returns If the value is a string
 */
export function isString(value: any): value is string {
  return toString.call(value) === "[object String]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a number
 */
export function isNumber(value: any): value is number {
  return toString.call(value) === "[object Number]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a boolean
 */
export function isBoolean(value: any): value is boolean {
  return toString.call(value) === "[object Boolean]";
}

/**
 *
 * @param value Any value
 * @returns If the value is undefined
 */
export function isUndefined(value: any): value is undefined {
  return toString.call(value) === "[object Undefined]";
}

/**
 *
 * @param value Any value
 * @returns If the value is null
 */
export function isNull(value: any): value is null {
  return toString.call(value) === "[object Null]";
}

/**
 *
 * @param value Any value
 * @returns If the value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

/**
 *
 * @param value Any value
 * @returns If the value is an error
 */
export function isError(value: any): value is Error {
  return toString.call(value) === "[object Error]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a regular expression
 */
export function isRegExp(value: any): value is RegExp {
  return toString.call(value) === "[object RegExp]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a buffer
 */
export function isBuffer(value: any): value is Buffer {
  return toString.call(value) === "[object Uint8Array]";
}

/**
 *
 * @param value Any value
 * @returns If the value is a symbol
 */
export function isSymbol(value: any): value is symbol {
  return toString.call(value) === "[object Symbol]";
}

/**
 *
 * @param value Any value
 * @returns If the value is an async function
 */
export function isAsyncFunction(value: any): boolean {
  return isFunction(value) && value.constructor.name === "AsyncFunction";
}

/**
 *
 * @param value Any value
 * @returns If the value is a promise
 */
export function isPromise(value: any): value is Promise<any> {
  return value && isFunction(value.then);
}

/**
 *
 * @param value Any value
 * @returns If the value is a primitive
 */
export function isPrimitive(value: any): boolean {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isNull(value) ||
    isUndefined(value) ||
    isSymbol(value)
  );
}

/**
 *
 * @param value Any value
 * @returns If the value is an iterable
 */
export function isIterable(value: any): value is Iterable<any> {
  return value && typeof value[Symbol.iterator] === "function";
}

/**
 *
 * @param value A number
 * @returns If the value is negative
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 *
 * @param value A number
 * @returns If the value is positive
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 *
 * @param value Any value
 * @returns If the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (isArray(value)) {
    return value.length === 0;
  } else if (isObject(value)) {
    return Object.keys(value).length === 0;
  } else {
    return !value;
  }
}
