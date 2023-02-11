"use client";

import Link from "next/link";
import React from "react";
import TableGeneratorData from "./TableGeneratorData";

export default function TableGeneratorBody({
  parsed,
  message,
  isSorting,
  isSearch,
  keyword,
  isTyping,
  colsData,
  colsName,
  pathname,
  isShowOption,
  notF,
}: any) {
  if (notF) {
    return (
      <tbody>
        <tr className="w-full h-12 bg-slate-500 mb-12">
          <td colSpan={colsData.length + 1}>
            <div className="flex flex-row mx-auto">
              <span className="text-center mx-auto">
                This is the last page of data.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  } else if (isTyping) {
    return (
      <>
        <tbody>
          <tr className="w-full h-12 bg-slate-500 mb-12">
            <td colSpan={colsData.length + 1}>
              <div className="flex flex-row mx-auto">
                <span className="text-center mx-auto">
                  Press enter/search button to find <b>{keyword}</b>.
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </>
    );
  } else if (isSearch) {
    return (
      <>
        <tbody>
          <tr className="w-full h-12 bg-slate-500 mb-12">
            <td colSpan={colsData.length + 1}>
              <div className="flex flex-row mx-auto">
                <span className="text-center text-gray mx-auto">
                  Finding something related to <b>{keyword}</b>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </>
    );
  } else if (message != "" && parsed.length !== 0) {
    return (
      <>
        <tbody>
          <tr className="w-full bg-slate-500 h-12 mb-12">
            <td colSpan={colsData.length + 1}>
              <div className="flex flex-row mx-auto">
                <span className="text-center mx-auto">
                  {message} <b>{keyword}</b>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </>
    );
  } else if (parsed.length == 0) {
    return (
      <>
        <tbody>
          <tr className="w-full bg-slate-500 h-12 mb-12">
            <td colSpan={colsData.length + 1}>
              <div className="flex flex-row mx-auto">
                <span className="ml-auto  mr-0">
                  Please wait while we get user data
                </span>
                <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </>
    );
  } else if (isSorting) {
    return (
      <>
        <tbody>
          <tr className="w-full bg-slate-500 h-12 mb-12">
            <td colSpan={colsData.length + 1}>
              <div className="flex flex-row mx-auto">
                <span className="ml-auto mr-0">
                  Please wait while we retrieve and sort user data
                </span>
                <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </>
    );
  }
  return (
    <tbody>
      {parsed.map((tbl_data: any, index: number) => {
        const id = Object.values(tbl_data)[0];
        return (
          <tr
            className={`h-auto  lg:table-row block bg-slate-300 rounded-md my-2 py-4 ${
              index % 2 == 0 ? "bg-slate-500" : "bg-slate-600"
            }`}
            key={index}
          >
            <TableGeneratorData
              tbl_data={tbl_data}
              colsName={colsName}
              pathname={pathname}
              id={id}
              isShowOption={isShowOption}
            ></TableGeneratorData>
          </tr>
        );
      })}
    </tbody>
  );
}
