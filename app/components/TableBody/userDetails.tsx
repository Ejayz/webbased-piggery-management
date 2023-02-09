"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Components({
  parsed,
  message,
  isSorting,
  isSearch,
  keyword,
  sortorder,
  sortby,
  setSortby,
  setSort,
  sortData,
  colsData,
  isTyping,
}: any) {
  const [prev, setPrev] = useState({ sortorder: sortorder, sortby: sortby });

  const SortUsingHeader = async (
    sortorder: any,
    columnName: any,
    prev: any
  ) => {
    if (isChangeCol(columnName, prev.sortby)) {
      if (isAscending(sortorder, prev.sortorder)) {
        setSort("DESC");
        setPrev({ sortorder: sortorder, sortby: columnName });
      } else {
        setSort("ASC");
        setPrev({ sortorder: sortorder, sortby: columnName });
      }
    } else {
      setSort("ASC");
      setSortby(columnName);
      setPrev({ sortorder: sortorder, sortby: columnName });
    }
  };

  function isAscending(sortorder: any, prevOrder: any) {
    if (sortorder == "ASC") {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    sortData();
  }, [prev]);

  function isChangeCol(sortby: any, prevSortBy: any) {
    if (sortby == prevSortBy) {
      return true;
    }
    return false;
  }
  if (isTyping) {
    return (
      <>
        <div className="w-full h-12 mb-12">
          <div className="flex flex-row mx-auto text-center">
            <span className="text-center mx-auto">
              Press enter/search button to find <b>{keyword}</b>.
            </span>
          </div>
        </div>
      </>
    );
  } else if (isSearch) {
    return (
      <>
        <div className="w-full h-12 mb-12">
          <div className="flex flex-row mx-auto text-center">
            <span className="text-center mx-auto">
              Finding something related to <b>{keyword}</b>
            </span>
          </div>
        </div>
      </>
    );
  } else if (message != "" && parsed.lenght !== 0) {
    return (
      <>
        <div className="w-full h-12 mb-12">
          <div className="flex flex-row mx-auto text-center">
            <span className="text-center mx-auto">
              {message} <b>{keyword}</b>
            </span>
          </div>
        </div>
      </>
    );
  } else if (parsed.length == 0) {
    return (
      <>
        <div className="w-full h-12 mb-12">
          <div className="flex flex-row mx-auto text-center">
            <span className="ml-auto mr-0">
              Please wait while we get user data
            </span>
            <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
          </div>
        </div>
      </>
    );
  } else if (isSorting) {
    return (
      <>
        <div className="w-full h-12 mb-12">
          <div className="flex flex-row mx-auto text-center">
            <span className="ml-auto mr-0">
              Please wait while we retrieve and sort user data
            </span>
            <div className="h-6 ml-2 mr-auto animate-spin w-6 rounded-full border-b-4 border-l-4 border-slate-400"></div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <table className="w-11/12 mt-2 text-black mx-auto h-12 text-left text-fixed lg:text-center mb-24  rounded-md">
        <thead className="cursor-pointer lg:table-header-group  hidden   text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {colsData.map((col: any, key: any) => (
              <th
                key={key}
                onClick={() => {
                  SortUsingHeader(sortorder, col, prev);
                }}
              >
                <div className="flex justify-center flex-row">
                  {col}
                  <Image
                    className={`${sortby == col ? "visible" : "hidden"}`}
                    src={
                      sortorder == "ASC"
                        ? "/assets/table/ascending.svg"
                        : "/assets/table/descending.svg"
                    }
                    width={24}
                    height={24}
                    alt={""}
                  ></Image>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-y-scroll overflow-x-hidden overscroll-contain h-12">
          {parsed.map((user: any, index: number) => (
            <tr
              className={`h-auto lg:table-row block bg-slate-300 rounded-md my-2 py-4 ${
                index % 2 == 0 ? "bg-slate-500" : "bg-slate-600"
              }`}
              key={index}
            >
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Username:</p>
                <p className="break-words">{user.username}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Full Name:</p>
                <p className="break-words">
                  {user.first_name} {user.middle_name} {user.last_name}
                </p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Job:</p>
                <p className="break-all">{user.job}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Phone:</p>
                <p className="break-all">{user.phone}</p>
              </td>
              <td className="block lg:table-cell flex lg:flex-none flex-row">
                <p className="lg:hidden ml-4 w-1/4 font-bold">Actions</p>
                <div className="btn-group">
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "e",
                        id: user.user_id,
                      },
                    }}
                  >
                    Edit
                  </Link>
                  |
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "v",
                        id: user.user_id,
                      },
                    }}
                  >
                    View
                  </Link>
                  |
                  <Link
                    className="px-2 hover:text-blue-500 link"
                    href={{
                      pathname: `/user_management/owner/`,
                      query: {
                        action: "d",
                        id: user.user_id,
                      },
                    }}
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
