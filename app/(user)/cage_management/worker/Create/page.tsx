"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useCageManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import NormalInput from "@/components/FormCompsV2/NormalInput";

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

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
    },
  });
  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    if (!confirm("Create cage?")) {
      return false;
    }
    createUser(data);
  };

  const cage_option = [
    {
      value: "Individual Stalls",
      display: "Individual Stalls",
      disabled: false,
    },
    {
      value: "Group Housing",
      display: "Group Housing",
      disabled: false,
    },
    {
      value: "Forrowing Crates",
      display: "Forrowing Crates",
      disabled: false,
    },
    {
      value: "Sow Stalls",
      display: "Sow Stalls",
      disabled: false,
    },
    {
      value: "Grow Finishing Housing",
      display: "Grow Finishing Housing",
      disabled: false,
    },
    {
      value: "Nursery Pens",
      display: "Nursery Pens",
      disabled: false,
    },
    {
      value: "Quarantine Cage",
      display: "Quarantine Cage",
      disabled: false,
    },
  ];
  const selection = watch("cage_type");
  const [processing, setProcessing] = useState(false);

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
    reset();
  }

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

  async function createUser(data: any) {
    const returned = await Create(
      data.cage_name,
      data.cage_capacity,
      data.cage_type
    );
    if (returned.code == 200) {
      setProcessing(false);
      toast.success(returned.message);
      resetState();
    } else {
      setProcessing(false);
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
                    <li className="font-bold">Create Cage</li>
                  </ul>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2">
                    <NormalInput
                      name={"cage_name"}
                      label={"Cage Name"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
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
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
                    <SelectInput
                      name={"cage_type"}
                      label={"Cage Type"}
                      register={register}
                      errors={errors}
                      required={true}
                      options={cage_option}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></SelectInput>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        processing ? "loading" : ""
                      }`}
                    >
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
