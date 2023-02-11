"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function TableGeneratorData({
  tbl_data,
  pathname,
  id,
  isShowOption,
}: any) {
  return (
    <>
      {Object.entries(tbl_data).map(([key, value]: any) => {
        if (!(key.includes("id") || key.includes("is_exist"))) {
          const colsName = key.replace("_", " ");
          return (
            <td
              key={key}
              className="block lg:table-cell flex lg:flex-none flex-row"
            >
              <p className="lg:hidden uppercase ml-4 w-1/4 font-bold">
                {colsName}:
              </p>
              <p className="break-words">{value}</p>
            </td>
          );
        } else if (key.includes("id")) {
        }
      })}
      <td className="block lg:table-cell flex lg:flex-none flex-row">
        <p className="lg:hidden ml-4 w-1/4 font-bold">ACTION</p>
        <div className="btn-group">
          <Link
            className={`px-2 hover:text-blue-500 link ${
              isShowOption.edit ? "block" : "hidden"
            }`}
            href={{
              pathname: pathname,
              query: {
                action: "e",
                id: id,
              },
            }}
          >
            Edit
          </Link>

          <Link
            className={`px-2 hover:text-blue-500 link ${
              isShowOption.view ? "block" : "hidden"
            }`}
            href={{
              pathname: pathname,
              query: {
                action: "v",
                id: id,
              },
            }}
          >
            View
          </Link>

          <Link
            className={`px-2 hover:text-blue-500 link ${
              isShowOption.delete ? "block" : "hidden"
            }`}
            href={{
              pathname: pathname,
              query: {
                action: "d",
                id: id,
              },
            }}
          >
            Remove
          </Link>
        </div>
      </td>
    </>
  );
}
