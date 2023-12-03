"use client";

import React from "react";

export default function Page() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Hello, world!</h1>
      <p className="text-2xl mt-4">Count: {count}</p>
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
