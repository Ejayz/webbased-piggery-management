"use client";
import Table from "@/components/TableReorderModifiedOwner/Table";
import { getData, Search, sortData } from "@/hooks/useReorder";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Inventory {
  item_name: string;
  category_name: any;
  item_description: string;
  item_quantity: any;
  item_unit: string;
  item_net_weight: any;
}

interface ApiData {
  code: number;
  data: Inventory[];
}

export default function Page() {
  const [parsed, setParsed] = useState<Inventory[]>([]);
  const [sorts, setSort] = useState("asc");
  const [sortby, setSortBy] = useState("r.reorder_date");
  const colsName = ["reorder_id", "total_reorder", "reorder_date", "status"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/reorder_management/owner";
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
