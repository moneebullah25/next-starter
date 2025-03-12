"use client";

import type { WithChildren } from "../../types";

interface Props extends WithChildren {
  environment: NodeJS.ProcessEnv["NODE_ENV"];
}

export function RestrictEnvironment({ environment, children }: Props) {
  if (process.env.NODE_ENV === environment) {
    return children;
  }

  return null;
}
