import type { WithChildren } from "types";

import React, { useMemo } from "react";
import ReactDOM from "react-dom";

interface Props extends WithChildren {
  id: string;
}

export function ReactPortal(props: Props) {
  const portal = useMemo(() => {
    const existing = document.getElementById(props.id);

    if (existing) {
      return existing;
    }

    const portal = document.createElement("div");
    portal.id = props.id;
    document.body.appendChild(portal);

    return portal;
  }, [props.id]);

  return ReactDOM.createPortal(props.children, portal);
}
