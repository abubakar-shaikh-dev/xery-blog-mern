import React from "react";

export default function SearchBarNotFound() {
  return (
    <>
      <div className="px-16 py-20 text-center">
        <h2 className="font-semibold text-black">No results found</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          We can’t find anything with that term at the moment, try searching
          something else.
        </p>
      </div>
    </>
  );
}
