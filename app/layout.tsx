import "css/main.css";
import "css/tailwind.css";

import type { WithChildren } from "types";

import React from "react";

import { RestrictEnvironment } from "components/elements/RestrictEnvironment";
import { LazyComponent } from "components/elements/LazyComponent";

export default function Root({ children }: WithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <RestrictEnvironment environment="development">
          <LazyComponent
            objectName="DeveloperMenu"
            __import={() => {
              return import("components/elements/DeveloperMenu");
            }}
          />
        </RestrictEnvironment>
      </body>
    </html>
  );
}
