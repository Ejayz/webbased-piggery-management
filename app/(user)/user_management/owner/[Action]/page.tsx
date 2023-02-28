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

  const [isUsername, setIsUsername] = useState(true);
  const [isFirstName, setIsFirstName] = useState(true);
  const [isMiddleName, setIsMiddleName] = useState(true);
  const [isLastName, setIsLastName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isJob, setIsJob] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isRepeatPassword, setIsRepeatPassword] = useState(true);

  const Action = params.Action;
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startValidation, setStartValidation] = useState(false);
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

    if (username == "" || first_name == "" || last_name == "" || phone == "") {
      toast.error("All feilds are required.");
      return false;
    }

    if (params.Action == "Update") {
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
        toast.error("Please correct the inputs indicated in red.");
        return false;
      }
      var isOk = confirm("are you sure you want to update?");
      setIsSubmitting(true);
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
      callCancel(returned.message, "success");
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
      resetState();
      callCancel(returned.message, "success");
    } else {
      toast.error(returned.message);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/user_management/owner/List");
    } else {
      router.push(
        `/user_management/owner/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    const exec = async () => {
      const returned = await ViewUser(Queryid);

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
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else if (Action != "Update" && Action != "Remove" && Action != "View") {
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
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
                  startValidation={startValidation}
                />
              </div>
              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
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
