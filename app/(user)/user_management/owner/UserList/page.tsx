"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/useUserManagement";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  user_id: number;
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  job: string;
  is_exist: string;
}

interface ApiData {
  code: number;
  data: User[];
}

export default function Page() {
  const [parsed, setParsed] = useState<User[]>([]);
  const [sorts, setSort] = useState("asc");
  const [sortby, setSortBy] = useState("username");
  const [colsData, setColsData] = ["username", "name", "job", "phone"];
  const colsName = ["username", "name", "job", "phone"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/user_management/owner";
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");
  useEffect(() => {
    console.log(msg);
    console.log(status);
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
          <p className="text-2xl text-base-content my-auto p-4">User List</p>
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
