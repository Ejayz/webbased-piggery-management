"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/useCageManagement";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Cage {
  cage_name: String;
  cage_type: String;
  cage_capacity: Number;
}

interface ApiData {
  code: number;
  data: Cage[];
}

export default function Page() {
  const [parsed, setParsed] = useState<Cage[]>([]);
  const [sorts, setSort] = useState("asc");
  const [sortby, setSortBy] = useState("cage_name");
  const [colsData, setColsData] = ["cage_namge", "cage_capacity", "cage_type"];
  const colsName = ["cage_name", "cage_capacity", "cage_type"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/cage_management/worker";
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");
  useEffect(() => {
    if (msg != null) {
      if (status == "success") {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, []);
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">Cage List</p>
        </div>
        <Table
          setParsed={setParsed}
          parsed={parsed}
          colsData={colsData}
          colsName={colsName}
          sortby={sortby}
          setSortBy={setSortBy}
          sorts={sorts}
          setSort={setSort}
          isSorting={isSorting}
          setisSorting={setisSorting}
          getData={getData}
          Search={Search}
          sortData={sortData}
          pathname={pathname}
          page={page}
          setPage={setPage}
        ></Table>
      </div>
    </>
  );
}
