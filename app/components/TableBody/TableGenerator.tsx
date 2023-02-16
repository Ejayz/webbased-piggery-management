"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TableGeneratorBody from "./TableGeneratorBody";
import { toast } from "react-toastify";
export default function TableGenerator({
  setParsed,
  parsed,
  message,
  isSorting,
  isSearch,
  keyword,
  isTyping,
  sortorder,
  sortby,
  colsData,
  setSort,
  setSortby,
  colsName,
  pathname,
  isShowOption,
  notF,
  setNotF,
  base_url,
  setisSorting,
  getData,
}: any) {
  const [prev, setPrev] = useState({ sortorder: sortorder, sortby: sortby });
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function start() {
      setisSorting(true);
      const data = await getData(page, sortby, sortorder);
      console.log(data);
      if (data.code == 200) {
        setNotF(false);
        setisSorting(false);
        setParsed(data.data);
      } else if (data.code == 404) {
        setisSorting(false);
        setNotF(true);
      } else {
        setisSorting(false);
        toast.error(data.message);
      }
    }
    start();
  }, [page]);
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
    async function start() {
      setisSorting(true);
      const returned = await getData(page, sortby, sortorder);
      if (returned.code == 200) {
        setisSorting(false);
        setParsed(returned.data);
      } else {
        setisSorting(false);
      }
    }
    start();
  }, [prev]);

  useEffect(() => {}, [parsed]);
  function isChangeCol(sortby: any, prevSortBy: any) {
    if (sortby == prevSortBy) {
      return true;
    }
    return false;
  }
  return (
    <>
      <div className="w-full h-[130px] mb-6">
        <table className="w-11/12 mt-2  text-black mx-auto h-38 table-fixed text-left  lg:text-center   rounded-md">
          <thead className="cursor-pointer lg:table-header-group  hidden   text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {colsName.map((col: any, key: any) => (
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
              <th>ACTION</th>
            </tr>
          </thead>
          <TableGeneratorBody
            parsed={parsed}
            message={message}
            isSorting={isSorting}
            isSearch={isSearch}
            keyword={keyword}
            isTyping={isTyping}
            colsData={colsData}
            colsName={colsName}
            pathname={pathname}
            isShowOption={isShowOption}
            notF={notF}
          ></TableGeneratorBody>
        </table>
      </div>
      <div className="w-full  flex">
        <div className="btn-group mx-auto">
          <button
            onClick={() => {
              setPage(page == 1 ? 1 : page - 1);
            }}
            className="btn"
          >
            «
          </button>
          <button className="btn">Page {page}</button>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="btn"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
