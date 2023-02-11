"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import Loading from "@/components/Loading/loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ViewUser({ sortData }: any) {
  const [user_id, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const Queryid = useSearchParams().get("id");
  const router = useRouter();
  if (Queryid == undefined) {
    return <></>;
  }

  const RemoveUser = async (e: any) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to remove?")) {
      return false;
    }
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      user_id: user_id,
    });

    let response = await toast.promise(
      fetch("http://localhost:3000/api/post/UserManagement/RemoveUser", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }),
      {
        pending: "Adding user information in database.",
        success: "Process completed... Gathering Result",
        error: "Process failed.Gathering Result",
      }
    );
    let data = await response.json();
    if (data.code == 200) {
      toast.success(data.message);
      sortData();
      router.push("/user_management/owner?action=a&id=null");
    } else {
      toast.error(data.message);
    }
  };

  const BackAdd = async () => {
    router.push("user_management/owner?action=a&id=null");
  };
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

        setUserid(userData.user_id);
        setUsername(userData.username);
        setFirst_name(userData.first_name);
        setMiddle_name(userData.middle_name);
        setLast_name(userData.last_name);
        setPhone(userData.phone);
        setJob(userData.job);
      } else {
        toast.error(data.message);
      }
    }
    if (Queryid !== "null") {
      ViewUser();
    }
  }, [Queryid]);

  if (user_id == "") {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
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
              <li className="font-bold">Remove</li>
            </ul>
          </div>
          <form
            onSubmit={RemoveUser}
            className="flex w-full h-auto py-2 flex-col"
          >
            <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
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
                disabled={true}
                className={"input input-bordered h-10"}
                value={username}
                setter={setUsername}
              />
            </div>
            <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2">
              <InputBox
                type={"text"}
                label={"First Name"}
                placeholder={"first name"}
                name={"first_name"}
                className={"input input-bordered h-10"}
                value={first_name}
                setter={setFirst_name}
                disabled={true}
              />
              <InputBox
                type={"text"}
                label={"Middle Name"}
                placeholder={"Middle Name"}
                name={"first_name"}
                className={"input input-bordered h-10"}
                value={middle_name}
                disabled={true}
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
                disabled={true}
              />
            </div>
            <div className="w-full ml-2 grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-none grid-cols-none">
              <InputBox
                type={"text"}
                label={"Phone"}
                placeholder={"Phone"}
                name={"phone"}
                className={"input input-bordered h-10"}
                value={phone}
                setter={setPhone}
                disabled={true}
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
                disabled={true}
                default_option={"Job"}
                setter={setJob}
              />
            </div>

            <div>
              <button type="submit" className="btn btn-active btn-primary mx-4">
                REMOVE
              </button>
              <Link
                className="btn btn-active btn-primary mx-4"
                href={{
                  pathname: "/user_management/owner/",
                  query: {
                    action: "a",
                    id: "null",
                  },
                }}
              >
                CANCEL
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
