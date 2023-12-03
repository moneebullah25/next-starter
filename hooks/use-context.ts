import React, { useContext } from "react";

function withDefinedContext<T>(context: React.Context<T>, target: string) {
  const reactContext = useContext(context);

  if (reactContext === undefined) {
    throw new Error(`Context must be defined when using '${target}'`);
  }

  return reactContext;
}
