"use client";

import React, { useState } from "react";

import { useClsx } from "hooks";

export function DeveloperMenu() {
  const [hide, setHide] = useState(true);

  const { classNames, joinCls } = useClsx({
    base: "flex flex-row justify-normal px-4 py-2 bg-gray-50 border border-solid border-gray-100",
    body: {
      hidden: hide
    },
    svg: [
      "w-5 h-5 text-black",
      {
        "rotate-180": hide
      }
    ]
  });

  return (
    <div className="absolute bottom-0 left-[10%] transition-all duration-250 overflow-hidden font-sans">
      <div className="flex flex-row justify-between w-full">
        <div
          className={joinCls(
            classNames.base,
            "cursor-pointer !border-b-transparent rounded-tl rounded-tr w-max"
          )}
          onClick={() => setHide((v) => !v)}
        >
          <span className="font-medium leading-none pr-3 text-black">Developer Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames.svg}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </div>
      </div>
      <div className={joinCls(classNames.base, classNames.body)}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 border-b uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Webpack Variable
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                DEVELOPER_TOOLS_ENABLED
              </th>
              <td className="px-6 py-3">
                <code>{DEVELOPER_TOOLS_ENABLED ? "true" : "false"}</code>
              </td>
            </tr>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                NODE_ENVIRONMENT
              </th>
              <td className="px-6 py-3">
                <code>{NODE_ENVIRONMENT}</code>
              </td>
            </tr>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_ID
              </th>
              <td className="px-6 py-3">
                <code>{BUILD_ID}</code>
              </td>
            </tr>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_HASH
              </th>
              <td className="px-6 py-3">
                <code>{BUILD_HASH}</code>
              </td>
            </tr>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_VERSION
              </th>
              <td className="px-6 py-3">
                <code>{BUILD_VERSION}</code>
              </td>
            </tr>
            <tr className="dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_TIMESTAMP
              </th>
              <td className="px-6 py-3">
                <code>{BUILD_TIMESTAMP}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
