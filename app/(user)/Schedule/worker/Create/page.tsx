"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useCageManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import { Individual } from "@/components/Schedule_Component/individual";
import { Cage } from "@/components/Schedule_Component/cage";
import { Batch } from "@/components/Schedule_Component/batch";

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
    setProcessing(true);
    if (!confirm("Create cage?")) {
      setProcessing(false);
      return false;
    }
    createUser(data);
  };
  const [tabs, setTabs] = useState([
    {
      name: "individual",
      active: true,
    },
    {
      name: "cage",
      active: false,
    },
    {
      name: "batch",
      active: false,
    },
  ]);

  console.log(tabs);
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
                Manage Schedule
              </p>
            </div>

            <div
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Schedule</li>
                    <li className="font-bold">Create Schedule</li>
                  </ul>
                </div>

                <div className="tabs">
                  <button
                    onClick={() => {
                      setTabs([
                        {
                          name: "individual",
                          active: true,
                        },
                        {
                          name: "cage",
                          active: false,
                        },

                        {
                          name: "batch",
                          active: false,
                        },
                      ]);
                    }}
                    className={`tab tab-bordered ${
                      tabs[0].name == "individual" && tabs[0].active
                        ? "tab-active"
                        : ""
                    }`}
                  >
                    Individual Pigs
                  </button>
                  <button
                    onClick={() => {
                      setTabs([
                        {
                          name: "cage",
                          active: true,
                        },
                        {
                          name: "individual",
                          active: false,
                        },
                        {
                          name: "batch",
                          active: false,
                        },
                      ]);
                    }}
                    className={`tab tab-bordered ${
                      tabs[0].name == "cage" && tabs[0].active
                        ? "tab-active"
                        : ""
                    }`}
                  >
                    Cage
                  </button>
                  <button
                    onClick={() => {
                      setTabs([
                        {
                          name: "batch",
                          active: true,
                        },
                        {
                          name: "cage",
                          active: false,
                        },
                        {
                          name: "individual",
                          active: false,
                        },
                      ]);
                    }}
                    className={`tab tab-bordered ${
                      tabs[0].name == "batch" && tabs[0].active
                        ? "tab-active"
                        : ""
                    }`}
                  >
                    Batch
                  </button>
                  {tabs[0].name == "individual" && tabs[0].active ? (
                    <Individual />
                  ) : tabs[0].name == "cage" && tabs[0].active ? (
                    <Cage />
                  ) : tabs[0].name == "batch" && tabs[0].active ? (
                    <Batch />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
