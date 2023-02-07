"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import Loading from "@/components/Loading/loading";
import Link from "next/link";

export default function EditUser({ setAction }: any) {
  const [user_id, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");

  const router = useRouter();
  const Queryid = useSearchParams().get("id");

  if (Queryid == undefined) {
    toast.error("Query ID is invalid");
  }
  console.log(Queryid);

  function callCancel(e: any) {
    router.push("/user_management/?action=a");
  }

  useEffect(() => {
    async function ViewUser() {
      setUserid("");
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch(
        `${location.origin}/api/post/UserManagement/view_user/${Queryid}`,
        {
          method: "POST",
          headers: headersList,
        }
      );
      let data = await response.json();
      if (data.code == 200) {
        const userData = data.data[0];
        setTimeout(() => {
          setUserid(userData.user_id);
          setUsername(userData.username);
          setFirst_name(userData.first_name);
          setMiddle_name(userData.middle_name);
          setLast_name(userData.last_name);
          setPhone(userData.phone);
          setJob(userData.phone);
        }, 5000);
      } else {
        toast.error(data.message);
      }
    }
    if (Queryid != "null") {
      ViewUser();
    }
  }, [Queryid]);

  if (user_id == "") {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-full"}></Loading>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full bg-slate-500 h-11/12 flex flex-col">
          <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
            <ul>
              <li>User Management</li>

              <li>View</li>

              <li className="font-bold">Edit</li>
            </ul>
          </div>
          <form
            action="/user_management/"
            method="post"
            className="flex w-full h-auto py-2 flex-col"
          >
            <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4">
              <InputBox
                type={"text"}
                label={"User Id"}
                placeholder={"User Id"}
                name={"user_id"}
                disabled={true}
                className={"input input-bordered h-10"}
                value={user_id}
                setter={setUserid}
              />{" "}
              <InputBox
                type={"text"}
                label={"Username"}
                placeholder={"Username"}
                name={"username"}
                disabled={false}
                className={"input input-bordered h-10"}
                value={username}
                setter={setUsername}
                autofocus={true}
              />
              <InputBox
                type={"password"}
                label={"Password"}
                placeholder={"Password"}
                name={"password"}
                disabled={false}
                className={"input input-bordered h-10"}
                value={password}
                setter={setPassword}
                required={true}
              />
              <InputBox
                type={"password"}
                label={"Repeat Password"}
                placeholder={"Repeat Password"}
                name={"repeatPass"}
                disabled={false}
                className={"input input-bordered h-10"}
                value={repeatPassword}
                setter={setrepeatPass}
                required={true}
              />{" "}
            </div>
            <div className="w-full grid grid-rows-4 grid-cols-none lg:grid-cols-4 lg:grid-rows-none ml-2">
              <InputBox
                type={"text"}
                label={"First Name"}
                placeholder={"first name"}
                name={"first_name"}
                className={"input input-bordered h-10"}
                value={first_name}
                setter={setFirst_name}
              />
              <InputBox
                type={"text"}
                label={"Middle Name"}
                placeholder={"Middle Name"}
                name={"first_name"}
                className={"input input-bordered h-10"}
                value={middle_name}
                setter={setMiddle_name}
              />
              <InputBox
                type={"text"}
                label={"Last Name"}
                placeholder={"Last Name"}
                name={"last_name"}
                className={"input input-bordered h-10"}
                value={last_name}
                setter={setLast_name}
              />
            </div>
            <div className="w-full ml-2 grid grid-rows-4 lg:grid-cols-4 lg:grid-rows-none grid-cols-none">
              <InputBox
                type={"text"}
                label={"Phone"}
                placeholder={"Phone"}
                name={"phone"}
                className={"input input-bordered h-10"}
                value={phone}
                setter={setPhone}
              />
              <SelectBox
                label={"Job"}
                name={"Job"}
                selected={job}
                options={[
                  {
                    value: "worker",
                    display: "Worker",
                  },
                  {
                    value: "owner",
                    display: "Owner",
                  },
                  {
                    value: "veterinarian",
                    display: "Veterinarian",
                  },
                ]}
                disabled={false}
                default_option={"Job"}
                setter={setJob}
              />
            </div>
            <div className="w-full mt-2 mb-2 ml-2">
              <button className="btn btn-active btn-primary mx-4">
                Update
              </button>
              <Link
                onClick={(e) => {
                  callCancel(e);
                }}
                className="btn btn-active btn-primary mx-4"
                href={"/user_management/owner/?action=a&id=null"}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
