"use client";
import AddUser from "@/components/PigManagement/addForm";
import EditUser from "@/components/PigManagement/editForm";
import RemoveForm from "@/components/PigManagement/RemoveForm";
import ViewForm from "@/components/PigManagement/ViewForm";
import getUserInfo from "@/components/getUserInfo";
import getBaseUrl from "@/hooks/getBaseUrl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getData, sortData, Search } from "@/hooks/usePigManagement";
import Table from "@/components/TableBody/Table";
interface Pig {
  pig_id: number;
  cage_id: number;
  batch_id: number;
  breed_id: number;
  pig_tag: number;
  pig_type: string;
  birthdate: Date;
  weight: number;
  unit: string;
  status: string;
  is_exist: string;
}

interface ApiData {
  code: number;
  data: Pig[];
}

export default function Page() {
  const [compos, setComps] = useState(<></>);
  const action = useSearchParams().get("action");
  const [parsed, setParsed] = useState<Pig[]>([]);
  const [sorts, setSort] = useState("asc");
  const base_url = getBaseUrl();
  const loading = getUserInfo();
  const colsData = ["Pig ID", "Breed", "Batch", "Cage", "Weight", "Pig Tag"];
  const colsName = ["pig_id", "breed", "batch", "cage", "Weight", "pig_tag"];
  const [sortby, setSortBy] = useState("pig_id");
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/manage_pig/worker/";
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
            <p className="text-2xl  my-auto p-4">Pig Management</p>
          </div>
          <div className="h-auto w-11/12  mx-auto shadow-xl flex flex-col mb-12">
            <div className={` w-full  h-auto mx-auto flex`}>{compos}</div>
          </div>
        </div>
        {/* Table */}
        <div className="w-full h-1/2 ">
          <p className="text-2xl p-4 mx-autolg:h-1/2 h-auto w-full flex flex-col text-center overflow-hidden">
            Pig Data
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
            getData={getData}
            Search={Search}
            sortData={sortData}
            pathname={pathname}
          ></Table>
        </div>
      </div>
    </>
  );
}
