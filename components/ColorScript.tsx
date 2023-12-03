"use client";

import type { ColorScheme } from "types";

import React from "react";

interface ColorScript {
  defaultColorScheme: ColorScheme;
  cookieName: string;
}

function getScript({ defaultColorScheme, cookieName }: ColorScript): string {
  return `
    try {
        var colorScheme = document.cookie.replace(/(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        var computedColorScheme = colorScheme !== '' ? colorScheme : '${defaultColorScheme}';

        document.documentElement.classList.remove('dark', 'light');

        if (computedColorScheme === 'auto') {
          var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          computedColorScheme = isDarkMode ? 'dark' : 'light';
          document.cookie = '${cookieName}=auto; path=/';
        } else {
          document.cookie = '${cookieName}=' + computedColorScheme + '; path=/';
        }
 
        document.documentElement.classList.add(computedColorScheme); 
    } catch (e) {}
  `;
}

export function ColorScript({ defaultColorScheme, cookieName }: ColorScript) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getScript({ defaultColorScheme, cookieName })
      }}
    />
  );
}
