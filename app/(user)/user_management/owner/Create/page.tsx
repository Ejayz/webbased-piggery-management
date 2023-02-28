"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create, getData, Search, sortData } from "@/hooks/useUserManagement";
import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { toast } from "react-toastify";
import InputBoxLeft from "@/components/FormComponents/inputboxLeftLabel";
import {
  validateNormal,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
} from "@/hooks/useValidation";
import PasswordBox from "@/components/FormComponents/passwordBox";

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("default");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isMiddleName, setIsMiddleName] = useState(true);
  const [isLastName, setIsLastName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isRepeatPassword, setIsRepeatPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
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

  function resetState() {
    setReset(!reset);

    setUsername("");
    setFirst_name("");
    setMiddle_name("");
    setLast_name("");
    setPhone("");
    setJob("default");
    setPassword("");
    setrepeatPass("");
  }

  const validate = async (e: any) => {
    e.preventDefault();
    if (
      username == "" ||
      first_name == "" ||
      last_name == "" ||
      phone == "" ||
      job == "default"
    ) {
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
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }
    if (password != repeatPassword) {
      toast.error("Password and Repeat Password should be the same.");
      return false;
    }
    if (!confirm("Are you sure you want to create?")) {
      return false;
    }

    createUser();
  };

  async function createUser() {
    const returned = await Create(
      username,
      first_name,
      middle_name,
      last_name,
      password,
      phone,
      job
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
    } else {
      toast.error(returned.message);
    }
  }

  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <div className="w-full bg-base-100 h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage User
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage User</li>
                    <li className="font-bold">Create</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
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
                      className={`input input-bordered  h-10  `}
                      getter={username}
                      setter={setUsername}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsUsername}
                      reset={reset}
                    />
                    <PasswordBox
                      placeholder={"Password"}
                      name={"password"}
                      disabled={false}
                      className={`input input-bordered h-10  `}
                      getter={password}
                      setter={setPassword}
                      required={true}
                      validation={validatePassword}
                      setIsValid={setIsPassword}
                      reset={reset}
                    ></PasswordBox>
                    <InputBox
                      type={"password"}
                      label={"Repeat Password"}
                      placeholder={"Repeat Password"}
                      name={"repeatPass"}
                      disabled={false}
                      className={`input  input-bordered h-10  `}
                      getter={repeatPassword}
                      setter={setrepeatPass}
                      required={true}
                      validation={validatePassword}
                      setIsValid={setIsRepeatPassword}
                      reset={reset}
                    />
                  </div>
                  <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2">
                    <InputBox
                      type={"text"}
                      label={"First Name"}
                      placeholder={"first name"}
                      name={"first_name"}
                      className={`input input-bordered h-10  `}
                      getter={first_name}
                      setter={setFirst_name}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsFirstName}
                      reset={reset}
                    />
                    <InputBox
                      type={"text"}
                      label={"Middle Name"}
                      placeholder={"Middle Name"}
                      name={"first_name"}
                      className={`input input-bordered h-10  `}
                      getter={middle_name}
                      setter={setMiddle_name}
                      required={false}
                      validation={validateSkip}
                      setIsValid={setIsMiddleName}
                      reset={reset}
                    />
                    <InputBox
                      type={"text"}
                      label={"Last Name"}
                      placeholder={"Last Name"}
                      name={"last_name"}
                      className={`input input-bordered h-10  `}
                      getter={last_name}
                      setter={setLast_name}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsLastName}
                      reset={reset}
                    />
                  </div>
                  <div className="w-full ml-2 grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-none grid-cols-none">
                    <InputBoxLeft
                      type="text"
                      label={"Phone"}
                      placeholder="Phone"
                      name="phone"
                      className={`input input-bordered h-10  `}
                      getter={phone}
                      setter={setPhone}
                      required={true}
                      startingData={"+63"}
                      validation={validatePhone}
                      setIsValid={setIsPhone}
                      reset={reset}
                    />
                    <SelectBox
                      label={"Job"}
                      name={"Job"}
                      selected={job}
                      options={[
                        {
                          value: "worker",
                          display: "Worker",
                          disabled: false,
                        },
                        {
                          value: "owner",
                          display: "Owner",
                          disabled: false,
                        },
                        {
                          value: "veterinarian",
                          display: "Veterinarian",
                          disabled: false,
                        },
                      ]}
                      disabled={false}
                      default_option={"Job"}
                      setter={setJob}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsJob}
                      reset={reset}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button className="btn btn-active btn-primary mx-4">
                      Create
                    </button>
                    <button
                      type="reset"
                      onClick={resetState}
                      className="btn mx-4"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
