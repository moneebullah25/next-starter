import React, { useMemo } from "react";

interface Props {
  objectName: string;
  __import(): Promise<any>;
}

export function LazyComponent({ objectName, __import }: Props) {
  const Component = useMemo(() => {
    return React.lazy(async () => {
      const _ = await __import();

      if (_ == null || _[objectName] == null) {
        return {
          default: () => null
        };
      }

      return {
        default: _[objectName]
      };
    });
  }, []);

  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}
