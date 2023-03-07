"use client";
import { DateTime } from "luxon";
import Link from "next/link";
import { useRef, useState } from "react";

export default function TableGeneratorData({
  tbl_data,
  pathname,
  id,
  isShowOption,
  colsName,
}: any) {
  console.log(tbl_data);
  return (
    <>
      {colsName.map((col: any, keys: any) => {
        return Object.entries(tbl_data).map(([key, value]: any) => {
          const column_name = key.replace("_", " ");
          if (col == key) {
            if (column_name.includes("date")) {
              return (
                <td
                  key={key}
                  className="block lg:table-cell flex lg:flex-none flex-row"
                >
                  <p className="lg:hidden uppercase ml-4 w-1/4 font-bold">
                    {column_name}:
                  </p>
                  <p className="break-words">
                    {DateTime.fromISO(value).toFormat(
                      "MMMM dd, yyyy hh:mm:ssa"
                    )}
                  </p>
                </td>
              );
            } else {
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
          }
        });
      })}
      <td className="block lg:table-cell flex lg:flex-none flex-row">
        <p className="lg:hidden ml-4 w-1/4 font-bold">ACTION</p>
        <div className={`btn-group`}>
          <Link
            className={`px-1 hover:text-blue-500 link ${
              tbl_data.status == "requested" ? "hidden" : "hidden"
            } ${isShowOption.edit ? "block" : "hidden"}`}
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
              tbl_data.status == "viewed" ? "hidden" : ""
            } ${isShowOption.delete ? "block" : "hidden"}`}
            href={{
              pathname: `${pathname}/Remove`,
              query: {
                id: id,
              },
            }}
          >
            Remove
          </Link>
          <Link
            className={`px-1 hover:text-blue-500 link ${
              tbl_data.status == "viewed" ? "" : "hidden"
            } ${isShowOption.delete ? "block" : "hidden"}`}
            href={{
              pathname: `${pathname}/Confirm`,
              query: {
                id: id,
              },
            }}
          >
            Confirm
          </Link>
        </div>
      </td>
    </>
  );
}
