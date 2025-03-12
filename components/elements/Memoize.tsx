import type { WithChildren } from "types";

import React, { useMemo } from "react";

type ChildrenCallback<T> = (value: T) => React.ReactNode;

interface Props<T> extends WithChildren<"required", ChildrenCallback<T>> {
  compute(): T;
  dependencies?: any[];
}

export function Memoize<T>({ compute, dependencies = [], children }: Props<T>) {
  const memo = useMemo(compute, dependencies);

  return <>{children(memo)}</>;
}
