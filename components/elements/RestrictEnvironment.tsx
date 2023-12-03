"use client";

import type { WithChildren } from "../../types";

import React, { Suspense } from "react";

interface Props extends WithChildren {
  environment: typeof NODE_ENVIRONMENT;
}

export function RestrictEnvironment({ environment, children }: Props) {
  if (NODE_ENVIRONMENT === environment) {
    return children;
  }

  return null;
}
