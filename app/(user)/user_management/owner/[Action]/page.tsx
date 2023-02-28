"use client";

import InputBox from "@/components/FormComponents/inputbox";
import InputBoxLeft from "@/components/FormComponents/inputboxLeftLabel";
import PasswordBox from "@/components/FormComponents/passwordBox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, ViewUser } from "@/hooks/useUserManagement";
import {
  validateNormal,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/Errors/PageNotFound";

export default function Page({ params }: any) {
  const [user_id, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("default");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");
  const router = useRouter();
  const Queryid = useSearchParams().get("id");

  const [isUsername, setIsUsername] = useState(false);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isMiddleName, setIsMiddleName] = useState(false);
  const [isLastName, setIsLastName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isRepeatPassword, setIsRepeatPassword] = useState(true);
  const Action = params.Action;
  let message: any = [];
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
  const verifyInput = async (e: any) => {
    e.preventDefault();
    console.log({
      isUsername,
      isFirstName,
      isMiddleName,
      isLastName,
      isPhone,
      isJob,
      isPassword,
      isRepeatPassword,
    });
    if (username == "" || first_name == "" || last_name == "" || phone == "") {
      toast.error("All feilds are required.");
      return false;
    }
    if (
      !(
        isUsername &&
        isFirstName &&
        isMiddleName &&
        isLastName &&
        isPhone &&
        isJob &&
        isPassword &&
        isRepeatPassword
      )
    ) {
      toast.error("");
      return false;
    }
    if (params.Action == "Update") {
      var isOk = confirm("are you sure you want to update?");
      if (isOk) {
        updateUser();
      } else {
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        return false;
      }
      exec_remove();
    }
  };

  const exec_remove = async () => {
    const returned = await Remove(user_id);
    if (returned.code == 200) {
      toast.success(returned.message);
      callCancel();
    } else {
      toast.error(returned.message);
    }
  };

  const updateUser = async () => {
    const returned = await Update(
      username,
      password,
      first_name,
      middle_name,
      last_name,
      phone,
      job,
      user_id
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      callCancel();
      resetState();
    } else {
      toast.error(returned.message);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel() {
    router.push("/user_management/owner/UserList");
  }

  useEffect(() => {
    const exec = async () => {
      const returned = await ViewUser(Queryid);
      console.log(returned);
      if (returned.code == 200) {
        setUserid(returned.data[0].user_id);
        setUsername(returned.data[0].username);
        setJob(returned.data[0].job);
        setLast_name(returned.data[0].last_name);
        setMiddle_name(returned.data[0].middle_name);
        setFirst_name(returned.data[0].first_name);
        setPhone(returned.data[0].phone);
        setUserid(returned.data[0].user_id);
      } else {
        toast.error(returned.message);
        callCancel();
      }
    };

    if (Queryid !== null || Queryid !== undefined) {
      exec();
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
  } else if (Action != "Update" && Action != "Remove" && Action != "View") {
    console.log(Action);
    return <PageNotFound></PageNotFound>;
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">
              Manage User
            </p>
          </div>
        </div>
        <div
          data-theme="light"
          className="card mx-auto text-base-content w-11/12 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>User Management</li>

                <li>View</li>

                <li className="font-bold">Edit</li>
              </ul>
            </div>
            <form
              onSubmit={verifyInput}
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
                  className={`input text-base-content input-bordered h-10 ${
                    isUsername ? "" : "input-error"
                  }`}
                  getter={username}
                  setter={setUsername}
                  autofocus={true}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateNormal}
                  setIsValid={setIsUsername}
                />
                <PasswordBox
                  placeholder={"Password"}
                  name={"password"}
                  disabled={false}
                  className={`input ${
                    isPassword ? "" : "input-error"
                  } input-bordered h-10  `}
                  getter={password}
                  setter={setPassword}
                  required={false}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateUpdatePassword}
                  setIsValid={setIsPassword}
                />
                <InputBox
                  type={"password"}
                  label={"Repeat Password"}
                  placeholder={"Repeat Password"}
                  name={"repeatPass"}
                  disabled={false}
                  className={"input text-base-content input-bordered h-10"}
                  getter={repeatPassword}
                  setter={setrepeatPass}
                  required={false}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateUpdatePassword}
                  setIsValid={setIsRepeatPassword}
                />
              </div>
              <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2">
                <InputBox
                  type={"text"}
                  label={"First Name"}
                  placeholder={"first name"}
                  name={"first_name"}
                  className={"input text-base-content input-bordered h-10"}
                  getter={first_name}
                  setter={setFirst_name}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateNormal}
                  setIsValid={setIsFirstName}
                />
                <InputBox
                  type={"text"}
                  label={"Middle Name"}
                  placeholder={"Middle Name"}
                  name={"first_name"}
                  className={"input text-base-content input-bordered h-10"}
                  getter={middle_name}
                  setter={setMiddle_name}
                  required={false}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateSkip}
                  setIsValid={setIsMiddleName}
                />
                <InputBox
                  type={"text"}
                  label={"Last Name"}
                  placeholder={"Last Name"}
                  name={"last_name"}
                  className={"input text-base-content input-bordered h-10"}
                  getter={last_name}
                  setter={setLast_name}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateNormal}
                  setIsValid={setIsLastName}
                />
              </div>
              <div className="w-full ml-2 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none grid-cols-none">
                <InputBoxLeft
                  type="text"
                  label={"Phone"}
                  placeholder="Phone"
                  name="phone"
                  className={`input input-bordered h-10  ${
                    isPhone ? "" : "input-error"
                  }`}
                  getter={phone}
                  setter={setPhone}
                  required={true}
                  startingData={"+63"}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validatePhone}
                  setIsValid={setIsPhone}
                />
                <SelectBox
                  label={"Job"}
                  name={"Job"}
                  selected={job}
                  options={[
                    {
                      value: "worker",
                      display: "Worker",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "owner",
                      display: "Owner",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "veterinarian",
                      display: "Veterinarian",
                      disabled: Action == "View" || Action == "Remove",
                    },
                  ]}
                  disabled={false}
                  default_option={"Job"}
                  setter={setJob}
                  validation={validateSelect}
                  setIsValid={setIsJob}
                />
              </div>
              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button className="btn btn-active btn-primary mx-4">
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-active btn-primary mx-4"
                  >
                    REMOVE
                  </button>
                )}
                <Link
                  onClick={(e) => {
                    callCancel();
                  }}
                  className="btn btn-active btn-primary mx-4"
                  href={"/user_management/owner/UserList"}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
