"use client";
import Link from "next/link";
import { useRef, useState } from "react";

export default function TableGeneratorData({
  tbl_data,
  pathname,
  id,
  isShowOption,
  colsName,
}: any) {
  return (
    <>
      {colsName.map((col: any, keys: any) => {
        return Object.entries(tbl_data).map(([key, value]: any) => {
          const column_name = key.replace("_", " ");
          if (col == key) {
            return (
              <td
                key={key}
                className="block lg:table-cell flex lg:flex-none flex-row"
              >
                <p className="lg:hidden uppercase ml-4 w-1/4 font-bold">
                  {column_name}:
                </p>
                <p className="break-words">{value}</p>
              </td>
            );
          }
        });
      })}
      <td className="block lg:table-cell flex lg:flex-none flex-row">
        <p className="lg:hidden ml-4 w-1/4 font-bold">ACTION</p>
        <div className="btn-group">
          <Link
            className={`px-1 hover:text-blue-500 link ${
              isShowOption.edit ? "block" : "hidden"
            }`}
            href={{
              pathname: `${pathname}/Update`,
              query: {
                id: id,
              },
            }}
          >
            Update
          </Link>
          <Link
            className={`px-1 hover:text-blue-500 link ${
              isShowOption.view ? "block" : "hidden"
            }`}
            href={{
              pathname: `${pathname}/View`,
              query: {
                id: id,
              },
            }}
          >
            View
          </Link>

          <Link
            className={`px-1 hover:text-blue-500 link ${
              isShowOption.delete ? "block" : "hidden"
            }`}
            href={{
              pathname: `${pathname}/Remove`,
              query: {
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
