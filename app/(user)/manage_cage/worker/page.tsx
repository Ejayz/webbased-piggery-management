"use client";
import AddUser from "@/components/CageManagement/addForm";
import EditUser from "@/components/CageManagement/editForm";
import RemoveForm from "@/components/CageManagement/RemoveForm";
import ViewForm from "@/components/CageManagement/ViewForm";
import getUserInfo from "@/components/getUserInfo";
import getBaseUrl from "@/hooks/getBaseUrl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, sortData, Search } from "@/hooks/useCageManagement";
import Table from "@/components/TableBody/Table";
interface Cage {
  cage_id: number;
  cage_name: string;
  cage_type: string;
  cage_capacity: string;
  is_exist: string;
}

interface ApiData {
  code: number;
  data: Cage[];
}

export default function Page() {
  const [compos, setComps] = useState(<></>);
  const action = useSearchParams().get("action");
  const [parsed, setParsed] = useState<Cage[]>([]);
  const [sorts, setSort] = useState("ASC");
  const base_url = getBaseUrl();
  const loading = getUserInfo();
  const colsData = ["cage Name", "type", "capacity"];
  const colsName = ["cage_name", "cage_type", "cage_capacity"];
  const [sortby, setSortBy] = useState("cage_name");
  const [isSorting, setisSorting] = useState(false);
  useEffect(() => {
    async function getView() {
      if (action == null || action == "a") {
        setComps(
          <AddUser
            sortby={sortby}
            sorts={sorts}
            setParsed={setParsed}
            setisSorting={setisSorting}
          ></AddUser>
        );
      } else if (action == "v") {
        setComps(<ViewForm></ViewForm>);
      } else if (action == "e") {
        setComps(
          <EditUser
            sortData={sortData}
            sortby={sortby}
            sorts={sorts}
            setParsed={setParsed}
            setisSorting={setisSorting}
          ></EditUser>
        );
      } else if (action == "d") {
        setComps(
          <RemoveForm
            sortData={sortData}
            sortby={sortby}
            sorts={sorts}
            setParsed={setParsed}
            setisSorting={setisSorting}
          ></RemoveForm>
        );
      }
    }
    getView();
  }, [action]);
  return (
    <>
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Form */}
        <div className="w-full h-1/2  overflow-y-auto">
          <div className="w-11/12  mx-auto flex flex-row">
            <Image
              src={"/assets/icons/manage_cage.png"}
              alt={""}
              className="h-16 w-16"
              height={512}
              width={512}
            ></Image>
            <p className="text-2xl  my-auto p-4">Cage Management</p>
          </div>
          <div className="h-auto w-11/12  mx-auto shadow-xl flex flex-col mb-12">
            <div className={` w-full  h-auto mx-auto flex`}>{compos}</div>
          </div>
        </div>
        {/* Table */}
        <div className="w-full h-1/2 ">
          <p className="text-2xl p-4 mx-autolg:h-1/2 h-auto w-full flex flex-col text-center overflow-hidden">
            Cage Data
          </p>
          <Table
            setParsed={setParsed}
            base_url={base_url}
            parsed={parsed}
            colsData={colsData}
            colsName={colsName}
            sortby={sortby}
            setSortBy={setSortBy}
            sorts={sorts}
            setSort={setSort}
            isSorting={isSorting}
            setisSorting={setisSorting}
          ></Table>
        </div>
      </div>
    </>
  );
}
