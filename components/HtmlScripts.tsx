import React, { useMemo } from "react";

interface Script {
  async?: boolean;
  defer?: boolean;
}

interface SrcScript extends Script {
  src: string;
}

interface HtmlScript extends Script {
  html: string;
}

interface Props {
  scripts: SrcScript[] | HtmlScript[];
}

export function HtmlScripts({ scripts }: Props) {
  const scriptElements = useMemo(() => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const srcScript = script as SrcScript;
      const htmlScript = script as HtmlScript;

      if (srcScript.src) {
        const element = (
          <script key={i} async={srcScript.async} defer={srcScript.defer} src={srcScript.src} />
        );

        elements.push(element);

        continue;
      }

      if (htmlScript.html) {
        const element = (
          <script
            key={i}
            dangerouslySetInnerHTML={{
              __html: htmlScript.html
            }}
          />
        );

        elements.push(element);

        continue;
      }
    }

    return elements;
  }, [scripts]);

  return <React.Fragment>{scriptElements}</React.Fragment>;
}
