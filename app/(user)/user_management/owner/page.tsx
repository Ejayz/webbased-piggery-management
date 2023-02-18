"use client";
import ViewForm from "@/components/UserManagementForm/ViewForm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditUser from "@/components/UserManagementForm/editForm";
import AddUser from "@/components/UserManagementForm/addForm";
import UserDetails from "@/components/TableBody/userDetails";
import getBaseUrl from "@/hooks/getBaseUrl";
import RemoveForm from "@/components/UserManagementForm/RemoveForm";
import getUserInfo from "@/components/getUserInfo";
import { getData, Search, sortData } from "@/hooks/useUserManagement";
import Table from "@/components/TableBody/Table";

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
  const [compos, setComps] = useState(<AddUser></AddUser>);
  const action = useSearchParams().get("action");
  const [parsed, setParsed] = useState<User[]>([]);
  const [sorts, setSort] = useState("asc");
  const [sortby, setSortBy] = useState("username");
  const loading = getUserInfo();
  const [colsData, setColsData] = [
    "username",
    "first_name",
    "middle_name",
    "last_name",
    "job",
    "phone",
  ];
  const colsName = [
    "username",
    "first_name",
    "middle_name",
    "last_name",
    "job",
    "phone",
  ];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/manage_user/owner";
  const [allowed, setIsAllowed] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (
          loading.data.job == "worker" ||
          loading.data.job == "veterinarian"
        ) {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);

  useEffect(() => {
    async function getView() {
      if (action == null || action == "a") {
        setComps(<AddUser sortData={sortData}></AddUser>);
      } else if (action == "v") {
        setComps(<ViewForm></ViewForm>);
      } else if (action == "e") {
        setComps(<EditUser sortData={sortData}></EditUser>);
      } else if (action == "d") {
        setComps(<RemoveForm sortData={sortData}></RemoveForm>);
      }
    }
    getView();
  }, [action]);
  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <div className="w-full bg-base-200 h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className="lg:h-1/2 h-auto">
            <div className="w-11/12  mx-auto flex flex-row">
              <Image
                src={"/assets/icons/manage_user.png"}
                alt={""}
                className="h-16 w-16"
                height={512}
                width={512}
              ></Image>
              <p className="text-2xl  my-auto p-4">User Management</p>
            </div>

            <div className="h-auto w-11/12  mx-auto shadow-xl flex flex-col">
              <div className={` w-full  h-auto mx-auto flex`}>{compos}</div>
            </div>
          </div>
          <div className="w-full h-1/2 ">
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
            ></Table>
          </div>
        </div>
      </>
    );
  }
}
