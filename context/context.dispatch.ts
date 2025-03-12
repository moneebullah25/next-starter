import type { ContextReducerInterface } from "./context.types";

type StringIntersection = string & {};
type Context = ContextReducerInterface<StringIntersection, any>;
type Dispatch<T extends Context["payload"]> = () => T;
type Reducer<T extends Context["payload"]> = (fn: Dispatch<T>) => T;

/**
 * Encapsulates the reducer logic for the dispatch event
 * that is common to all internal reducers
 *
 * @param state The current state
 * @param action The action to perform
 * @returns The new state
 */
export function withDispatchReducer<T extends object, Y extends Context>(
  state: T,
  action: Y
): Reducer<T> {
  return (fn: Dispatch<T>) => {
    switch (action.type) {
      case "DISPATCH":
        return {
          ...state,
          ...action.payload
        };
      default:
        return {
          ...state,
          ...fn()
        };
    }
  };
}
