"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, View } from "@/hooks/useCageManagement";
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
  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState();

  const [isCageCapacity, setIsCageCapacity] = useState(true);
  const [isCageName, setIsCageName] = useState(true);
  const [isCageType, setIsCageType] = useState(true);

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  let message: any = [];
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }
  const verifyInput = async (e: any) => {
    e.preventDefault();

    if (cage_type == "default" || cage_name == "" || cage_capacity == "") {
      toast.error("All feilds are required.");
      return false;
    }

    if (params.Action == "Update") {
      if (!(isCageCapacity && isCageType && isCageName)) {
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

  useEffect(() => {
    console.log(cage_type);
    if (cage_type == "default") {
      setCageCapacity("");
    } else if (cage_type == "Individual Stalls") {
      setCageCapacity(1);
    } else if (cage_type == "Group Housing") {
      setCageCapacity(10);
    } else if (cage_type == "Forrowing Crates") {
      setCageCapacity(1);
    } else if (cage_type == "Sow Stalls") {
      setCageCapacity(1);
    } else if (cage_type == "Grow Finishing Housing") {
      setCageCapacity(10);
    } else if (cage_type == "Nursery Pens") {
      setCageCapacity(20);
    } else if (cage_type == "Quarantine Cage") {
      setCageCapacity(10);
    }
  }, [cage_type]);

  const exec_remove = async () => {
    const returned = await Remove(cage_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
    } else {
      toast.error(returned.message);
    }
  };

  const updateUser = async () => {
    const returned = await Update(cage_name, cage_id, cage_type, cage_capacity);
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
      router.push("/cage_management/worker/List");
    } else {
      router.push(
        `/cage_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    const exec = async () => {
      const returned = await View(Queryid);

      if (returned.code == 200) {
        setCageName(returned.data[0].cage_name);
        setCageType(returned.data[0].cage_type);
        setCageCapacity(returned.data[0].cage_capacity);
        setCageId(returned.data[0].cage_id);
      } else {
        toast.error(returned.message);
        callCancel();
      }
    };

    if (Queryid !== null || Queryid !== undefined) {
      exec().then(() => {
        setStartValidation(true);
      });
    }
  }, [Queryid]);

  if (cage_id == "") {
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
              <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
                <InputBox
                  type={"text"}
                  label={"Cage Name"}
                  placeholder={"Cage Name"}
                  name={"cagename"}
                  disabled={false}
                  className={`input text-base-content input-bordered h-10 ${
                    isCageName ? "" : "input-error"
                  }`}
                  getter={cage_name}
                  setter={setCageName}
                  autofocus={true}
                  required={true}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateNormal}
                  setIsValid={setIsCageName}
                  startValidation={startValidation}
                />
                <InputBox
                  type={"number"}
                  label={"Cage Capacity"}
                  placeholder={"Cage Capacity"}
                  name={"cagecapacity"}
                  disabled={false}
                  className={"input input-bordered h-10"}
                  getter={cage_capacity}
                  setter={setCageCapacity}
                  required={true}
                  readonly={true}
                  validation={validateNormal}
                  setIsValid={setIsCageCapacity}
                  startValidation={startValidation}
                />
              </div>
              <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
                <SelectBox
                  label={"Cage Type"}
                  name={"cage_type"}
                  selected={cage_type}
                  disabled={false}
                  default_option={"Cage Type"}
                  options={[
                    {
                      value: "Individual Stalls",
                      display: "Individual Stalls",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Group Housing",
                      display: "Group Housing",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Forrowing Crates",
                      display: "Forrowing Crates",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Sow Stalls",
                      display: "Sow Stalls",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Grow Finishing Housing",
                      display: "Grow Finishing Housing",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Nursery Pens",
                      display: "Nursery Pens",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "Quarantine Cage",
                      display: "Quarantine Cage",
                      disabled: Action == "View" || Action == "Remove",
                    },
                  ]}
                  setter={setCageType}
                  required={true}
                  validation={validateSelect}
                  setIsValid={setIsCageType}
                  startValidation={startValidation}
                ></SelectBox>
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
