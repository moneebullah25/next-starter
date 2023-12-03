import type { ClassValue } from "clsx";

import { useMemo } from "react";

import clsx from "clsx";

interface Props {
  [key: string]: ClassValue[] | ClassValue;
}

type ClassesInfer<T extends Props> = {
  [key in keyof T]: string;
};

type ClsxResult<T extends Props> = {
  classNames: ClassesInfer<T>;
  joinCls(...classes: ClassValue[]): string;
};

export function useClsx<T extends Props>(classes: T): ClsxResult<T> {
  const classNames = useMemo(() => {
    const clsxClasses = {} as ClassesInfer<T>;

    for (const [key, value] of Object.entries(classes)) {
      clsxClasses[key as keyof T] = clsx(value);
    }

    return clsxClasses;
  }, [classes]);

  return {
    classNames: classNames,
    joinCls: clsx
  } as ClsxResult<T>;
}
