/**
 * A noop is a function that does nothing.
 */
export function noop() {}

/**
 * A fatal noop is a function that should never be called.
 */
export function fatalNoop() {
  throw new Error("Fatal noop called");
}
