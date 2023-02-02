"use client";
import UserDetails from "@/components/TableBody/userDetails";
import ViewForm from "@/components/UserManagementForm/ViewForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditUser from "@/components/UserManagementForm/editForm";
import AddUser from "@/components/UserManagementForm/addForm";
export default function Page() {
  const [userid, setUserid] = useState();
  const [compos, setComps] = useState(<AddUser></AddUser>);
  const action = useSearchParams().get("action");

  useEffect(() => {
    async function getView() {
      console.log(action == null);
      if (action == null || action == "a") {
        setComps(<AddUser></AddUser>);
      } else if (action == "v") {
        setComps(<ViewForm></ViewForm>);
      } else if (action == "e") {
        setComps(<EditUser></EditUser>);
      } else if (action == "d") {
        setComps(<ViewForm></ViewForm>);
      }
    }
    getView();
  }, [action]);
  return (
    <>
      <div className="w-full h-auto oveflow-y-auto flex flex-col overflow-x-hidden">
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
        <div className="h-1/2 w-full flex flex-col text-center overflow-x-hidden">
          <p className="text-2xl p-4 mx-auto">Users Data</p>
          <table className="w-11/12 mx-auto h-12 text-left text-fixed lg:text-center mb-24  rounded-md">
            <thead className="lg:table-header-group  hidden bg-slate-400">
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Job</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll overflow-x-hidden overscroll-contain h-12">
              <UserDetails setUserId={setUserid}></UserDetails>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
