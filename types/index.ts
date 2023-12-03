import React from "react";

type WithBaseGeneric = "required" | "optional";

/**
 * Adds children to a component. By default, children are required.
 */
export type WithChildren<
  T extends WithBaseGeneric = "required",
  R = React.ReactNode
> = T extends "required" ? { children: R } : { children?: R };

export type CSSPropertiesExtended = React.CSSProperties & {
  [key: string]: string;
};

export type WithNullable<T> = T | null | undefined | void;

export type ColorScheme = "light" | "dark" | "auto";
