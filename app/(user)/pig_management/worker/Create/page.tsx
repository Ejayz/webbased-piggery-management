"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useCageManagement";
import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { toast } from "react-toastify";
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

  const [cage, setCage] = useState();
  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState();

  const [isCageCapacity, setIsCageCapacity] = useState(true);
  const [isCageName, setIsCageName] = useState(true);
  const [isCageType, setIsCageType] = useState(true);

  const [reset, setReset] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (loading.data.job == "owner" || loading.data.job == "veterinarian") {
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
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

  const validate = async (e: any) => {
    e.preventDefault();
    if (cage_type == "default" || cage_name == "" || cage_capacity == "") {
      toast.error("All feilds are required.");
      return false;
    }

    if (!(isCageCapacity && isCageType && isCageName)) {
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }

    if (!confirm("Are you sure you want to create?")) {
      return false;
    }

    createUser();
  };
  useEffect(() => {
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
  
  async function createUser() {
    const returned = await Create(cage_name, cage_capacity, cage_type);
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
                Manage Cage
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Cage</li>
                    <li className="font-bold">Create</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
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
                      className={"input input-bordered h-8"}
                      getter={cage_name}
                      setter={setCageName}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsCageName}
                      reset={reset}
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
                      reset={reset}
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
                        },
                        {
                          value: "Group Housing",
                          display: "Group Housing",
                        },
                        {
                          value: "Forrowing Crates",
                          display: "Forrowing Crates",
                        },
                        {
                          value: "Sow Stalls",
                          display: "Sow Stalls",
                        },
                        {
                          value: "Grow Finishing Housing",
                          display: "Grow Finishing Housing",
                        },
                        {
                          value: "Nursery Pens",
                          display: "Nursery Pens",
                        },
                        {
                          value: "Quarantine Cage",
                          display: "Quarantine Cage",
                        },
                      ]}
                      setter={setCageType}
                      required={true}
                      validation={validateSelect}
                      setIsValid={setIsCageType}
                      reset={reset}
                    ></SelectBox>
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
