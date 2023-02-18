"use client";

import { useEffect, useState } from "react";
import SorterSearchLayout from "./SorterSearchLayout";
import TableGenerator from "./TableGenerator";

export default function Table({
  setParsed,
  parsed,
  colsData,
  colsName,
  sortby,
  setSortBy,
  sorts,
  setSort,
  isSorting,
  setisSorting,
  getData,
  Search,
  sortData,
  pathname,
}: any) {
  const [notF, setNotF] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [keyword, setKeyword] = useState("");
  const [isSearch, setSearch] = useState(false);
  const isShowOption = {
    edit: true,
    view: true,
    delete: true,
  };

  const [isTyping, setisTyping] = useState(false);
  useEffect(() => {
    async function start() {
      if (keyword == "") {
        const returned = await getData(1, sortby, sorts);
        console.log(returned);
        if (returned.code == 200) {
          setisSorting(false);
          setisTyping(false);
          setParsed(returned.data);
        }
      } else if (keyword !== "") {
        setisTyping(true);
      }
    }
    start();
  }, [keyword]);

  return (
    <>
      <SorterSearchLayout
        sortby={sortby}
        isSorting={isSorting}
        setSort={setSort}
        sorts={sorts}
        setSortBy={setSortBy}
        sortData={sortData}
        colsName={colsName}
        Search={Search}
        setKeyword={setKeyword}
        keyword={keyword}
        setParsed={setParsed}
        setisTyping={setisTyping}
        setSearch={setSearch}
        setMessage={setMessage}
      ></SorterSearchLayout>
      <TableGenerator
        setParsed={setParsed}
        parsed={parsed}
        message={message}
        isSorting={isSorting}
        isSearch={isSearch}
        keyword={keyword}
        isTyping={isTyping}
        sortorder={sorts}
        sortby={sortby}
        colsData={colsData}
        setSort={setSort}
        setSortby={setSortBy}
        colsName={colsName}
        pathname={pathname}
        isShowOption={isShowOption}
        notF={notF}
        setNotF={setNotF}
        setisSorting={setisSorting}
        getData={getData}
      ></TableGenerator>
    </>
  );
}
