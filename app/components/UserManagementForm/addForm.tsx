"use client";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import Loading from "@/components/Loading/loading";
export default function AddUser({ id }: any) {
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("default");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");

  function resetState() {
    setUsername("");
    setFirst_name("");
    setMiddle_name("");
    setLast_name("");
    setPhone("");
    setJob("default");
    setPassword("");
    setrepeatPass("");
  }

  async function createUser(e: any) {
    e.preventDefault();
    if (
      username == "" ||
      first_name == "" ||
      middle_name == "" ||
      last_name == "" ||
      phone == "" ||
      job == "default"
    ) {
      toast.error("All feilds are required.");
      return false;
    }
    if (password != repeatPassword) {
      toast.error("Password and Repeat Password do not match.");
      return false;
    }
    if (!(password.length >= 8)) {
      toast.error("atleast 8 Character long password is required");

      return false;
    }
    if (!/\d/.test(password)) {
      toast.error("Password should contain atleast 1 number");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password should contain atleast 1 UpperCase letter");

      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password should contain atleast 1 LowerCase letter");

      return false;
    }

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: username,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      password: password,
      phone: phone,
      job: job,
    });

    let response = await toast.promise(
      fetch("http://localhost:3000/api/post/addUser", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }),
      {
        pending: "Adding user information in database.",
        success: "Process completed... Gathering Result",
        error: "Process failed.Gathering Result",
      },
      { toastId: "Promised" }
    );
    console.log(response);
    let data = await response.json();
    if (data.code == 200) {
      setTimeout(() => {
        toast.dismiss("Promised");
      }, 1000);
      toast.success(data.message, { delay: 2000 });
      resetState();
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="w-full bg-slate-500 h-11/12 flex flex-col">
        <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
          <ul>
            <li>User Management</li>
            <li className="font-bold">Add</li>
          </ul>
        </div>
        <form
          onSubmit={createUser}
          method="post"
          className="flex w-full h-auto py-2 flex-col"
        >
          <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
            <InputBox
              type={"text"}
              label={"Username"}
              placeholder={"Username"}
              name={"username"}
              disabled={false}
              className={"input input-bordered h-10"}
              value={username}
              setter={setUsername}
              required={true}
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
          <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2">
            <InputBox
              type={"text"}
              label={"First Name"}
              placeholder={"first name"}
              name={"first_name"}
              className={"input input-bordered h-10"}
              value={first_name}
              setter={setFirst_name}
              required={true}
            />
            <InputBox
              type={"text"}
              label={"Middle Name"}
              placeholder={"Middle Name"}
              name={"first_name"}
              className={"input input-bordered h-10"}
              value={middle_name}
              setter={setMiddle_name}
              required={true}
            />
            <InputBox
              type={"text"}
              label={"Last Name"}
              placeholder={"Last Name"}
              name={"last_name"}
              className={"input input-bordered h-10"}
              value={last_name}
              setter={setLast_name}
              required={true}
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
              required={true}
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
              required={true}
            />
          </div>
          <div className="w-full mt-2 mb-2 ml-2">
            <button className="btn btn-active btn-primary mx-4">Add</button>
            <button
              type="reset"
              onClick={resetState}
              className="btn btn-active btn-primary mx-4"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
