"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";

export default function ViewUser({ id }: any) {
  const [user_id, setUserid] = useState(null);
  const [username, setUsername] = useState(null);
  const [first_name, setFirst_name] = useState(null);
  const [middle_name, setMiddle_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [phone, setPhone] = useState(null);
  const [job, setJob] = useState(null);
  useEffect(() => {
    async function ViewUser() {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      let response = await fetch(`${location.origin}/api/get/view_user/2`, {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      if (data.code == 200) {
        console.log(data);
        const userData = data.data[0];
        setUserid(userData.user_id);
        setUsername(userData.username);
        setFirst_name(userData.first_name);
        setMiddle_name(userData.middle_name);
        setLast_name(userData.last_name);
        setPhone(userData.phone);
        setJob(userData.phone);
      } else {
        toast.error(data.message);
      }
    }
    ViewUser();
  }, []);

  if (user_id == null) {
    return <>Loading</>;
  } else {
    return (
      <>
        <div className="w-full bg-slate-500 h-11/12 flex flex-col">
          <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
            <ul>
              <li>Dashboard</li>

              <li>View</li>

              <li className="font-bold">Modify</li>
            </ul>
          </div>
          <form
            action="/user_management/"
            method="get"
            className="flex w-full h-auto py-2 flex-col"
          >
            <div className="w-1/4 ml-2">
              <InputBox
                type={"text"}
                label={"User Id"}
                placeholder={"User Id"}
                name={"user_id"}
                disabled={true}
                className={"input input-bordered h-10"}
                value={user_id}
                setter={setUserid}
              ></InputBox>
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
            <div className="w-full ml-2 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none grid-cols-none">
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
              <button className="btn btn-active btn-primary">Update</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
