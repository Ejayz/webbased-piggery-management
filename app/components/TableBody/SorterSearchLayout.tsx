"use client";
import SearchComponent from "./SearchComponent";
import SorterMobile from "./SorterComponent";

export default function SorterSearchLayout({
  sortby,
  isSorting,
  setSort,
  sorts,
  setSortBy,
  sortData,
  colsName,
  Search,
  setKeyword,
  keyword,
  base_url,
  setParsed,
  setisTyping,
  setSearch,
  setMessage,
  getData,
}: any) {
  return (
    <>
      <div className="w-11/12 mx-auto h-auto flex flex-row">
        <SorterMobile
          sortby={sortby}
          isSorting={isSorting}
          setSort={setSort}
          sorts={sorts}
          setSortBy={setSortBy}
          sortData={sortData}
          colsData={colsName}
        ></SorterMobile>
        <SearchComponent
          Search={Search}
          setKeyword={setKeyword}
          keyword={keyword}
          base_url={base_url}
          sortby={sortby}
          sorts={sorts}
          setParsed={setParsed}
          setisTyping={setisTyping}
          setSearch={setSearch}
          setMessage={setMessage}
          getData={getData}
        ></SearchComponent>
      </div>
    </>
  );
}
