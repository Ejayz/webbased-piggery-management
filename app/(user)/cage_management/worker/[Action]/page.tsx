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
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import { useQuery } from "react-query";

export default function Page({ params }: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      cage_name: "",
      cage_capacity: "",
      cage_type: "",
      cage_id: "",
    },
  });
  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    setProcessing(true);
    if (params.Action == "Update") {
      var isOk = confirm("are you sure you want to update?");
      if (isOk) {
        updateUser(data);
      } else {
        setProcessing(false);
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        setProcessing(false);
        return false;
      }

      exec_remove(data);
    }
  };

  const selection = watch("cage_type");

  const Action = params.Action;
  const router = useRouter();
  const Queryid = useSearchParams().get("id");

  const [processing, setProcessing] = useState(false);

  const cage_option = [
    {
      value: "Individual Stalls",
      display: "Individual Stalls",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Group Housing",
      display: "Group Housing",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Forrowing Crates",
      display: "Forrowing Crates",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Sow Stalls",
      display: "Sow Stalls",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Grow Finishing Housing",
      display: "Grow Finishing Housing",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Nursery Pens",
      display: "Nursery Pens",
      disabled: Action === "View" || Action === "Remove",
    },
    {
      value: "Quarantine Cage",
      display: "Quarantine Cage",
      disabled: Action === "View" || Action === "Remove",
    },
  ];

  let message: any = [];
  function resetState() {
    reset();
  }

  const { data, isLoading, isError } = useQuery(
    ["myQueryKey", Queryid !== null || Queryid !== undefined],
    async () => {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `${location.origin}/api/post/CageManagement/ViewCage/${Queryid}`,
        {
          method: "GET",
          headers: headersList,
        }
      );
      return response.json();
    }
  );

  useEffect(() => {
    if (selection == "default") {
      setValue("cage_capacity", "");
    } else if (selection == "Individual Stalls") {
      setValue("cage_capacity", "1", { shouldValidate: false });
    } else if (selection == "Group Housing") {
      setValue("cage_capacity", "10");
    } else if (selection == "Forrowing Crates") {
      setValue("cage_capacity", "1", { shouldValidate: false });
    } else if (selection == "Sow Stalls") {
      setValue("cage_capacity", "1");
    } else if (selection == "Grow Finishing Housing") {
      setValue("cage_capacity", "10", { shouldValidate: false });
    } else if (selection == "Nursery Pens") {
      setValue("cage_capacity", "20", { shouldValidate: false });
    } else if (selection == "Quarantine Cage") {
      setValue("cage_capacity", "10", { shouldValidate: false });
    }
  }, [selection]);

  const exec_remove = async (data: any) => {
    const returned = await Remove(data.cage_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setProcessing(false);
    } else {
      toast.error(returned.message);
      setProcessing(false);
    }
  };

  const updateUser = async (data: any) => {
    const returned = await Update(
      data.cage_name,
      data.cage_id,
      data.cage_type,
      data.cage_capacity
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
      router.push("/cage_management/worker/List");
    } else {
      router.push(
        `/cage_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      if (data.code == 200) {
        setValue("cage_name", data.data[0].cage_name, {
          shouldValidate: Action === "Update",
        });
        setValue("cage_type", data.data[0].cage_type, {
          shouldValidate: Action === "Update",
        });
        setValue("cage_capacity", data.data[0].cage_capacity, {
          shouldValidate: Action === "Update",
        });
        setValue("cage_id", data.data[0].cage_id, {
          shouldValidate: Action === "Update",
        });
      } else {
        toast.error(data.message);
        callCancel();
      }
    }
  }, [data]);

  if (Action != "Update" && Action != "Remove" && Action != "View") {
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

                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="w-full ml-2 gap-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
                {" "}
                <NormalInput
                  name={"cage_id"}
                  label={"Cage ID"}
                  register={register}
                  errors={errors}
                  required={true}
                  type={"text"}
                  readonly={true}
                  validationSchema={{
                    required: "This field is required",
                  }}
                ></NormalInput>
                <NormalInput
                  name={"cage_name"}
                  label={"Cage Name"}
                  register={register}
                  errors={errors}
                  required={true}
                  readonly={Action === "View" || Action === "Remove"}
                  type={"text"}
                  validationSchema={{
                    required: "This field is required",
                  }}
                ></NormalInput>
              </div>
              <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2">
                <NormalInput
                  name={"cage_capacity"}
                  label={"Cage Capacity"}
                  register={register}
                  errors={errors}
                  required={true}
                  type={"text"}
                  readonly={true}
                  validationSchema={{
                    required: "This field is required",
                  }}
                ></NormalInput>
                <SelectInput
                  name={"cage_type"}
                  label={"Cage Type"}
                  register={register}
                  errors={errors}
                  required={Action === "View" || Action === "Remove"}
                  options={cage_option}
                  validationSchema={{
                    required: "This field is required",
                  }}
                ></SelectInput>
              </div>
              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      processing ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      processing ? "loading" : ""
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
                  href={"/cage_management/worker/List"}
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
