import "css/main.css";
import "css/tailwind.css";

import type { WithChildren } from "types";

import React from "react";

export default function Root({ children }: WithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
