/**
 * A resuable interface for the reducer
 */
export interface ContextReducerInterface<T, P> {
  type: T | "DISPATCH";
  payload: Partial<P>;
}

/**
 * Each initial state has a dispatch event
 */
export type InitialStateWithDispatch<T, P extends object, Dispatcher extends string> = {
  [key in Dispatcher]: React.Dispatch<ContextReducerInterface<T, P>>;
} & P;
