"use client";
import { Remove, Update, View } from "@/hooks/usePigManagement";

import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/Errors/PageNotFound";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import { useQuery } from "react-query";
import { UpdateObjective, UpdateObjectiveItem } from "@/hooks/usePlan";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
  max?: string;
  current_capacity?: any;
}
interface SelectedCage {
  cage_id: string;
  selected_quantity: number;
}
export default function Page({ params }: any) {
  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [cageSelected, setCageSelected] = useState<SelectedCage[]>([]);
  const id: any = useSearchParams().get("id");
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      objective_name: "",
      objective_type: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { error, data, refetch, isLoading } = useQuery(
    "items",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Plans/getItemList`
      );
      const data = await response.json();
      return data;
    },
    {
      cacheTime: 0,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data !== undefined) {
      if (data.data) {
        setItemList(
          data.data.map((data: any, key: any) => {
            return {
              value: data.item_id,
              display: data.item_name,
              disabled: Action == "View" || Action == "Remove" ? true : false,
            };
          })
        );
      }
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);

  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState();

  const [isCageCapacity, setIsCageCapacity] = useState(true);
  const [isCageName, setIsCageName] = useState(true);
  const [isCageType, setIsCageType] = useState(true);
  const [itemList, setItemList] = useState<any>([]);

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  let message: any = [];
  const [processing, setProcessing] = useState(false);
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

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

  const exec_remove = async (data: any) => {
    const returned = await Remove(data.pig_id, data.cage_id);
    if (returned.code == 200) {
      setProcessing(false);
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      setProcessing(false);
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  const updateUser = async (data: any) => {
    const returned = await UpdateObjective(
      data.objective_name,
      data.objective_type,
      Queryid
    );
    if (returned.code == 200) {
      resetState();
      setProcessing(false);
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      setProcessing(false);
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/plans_management/veterinarian/List");
    } else {
      router.push(
        `/plans_management/veterinarian/List?msg=${message}&status=${status}`
      );
    }
  }

  const {
    error: errorView,
    data: dataView,
    isLoading: loadingView,
  } = useQuery("View", async () => {}, {});

  const {
    data: pigData,
    isLoading: pigLoading,
    error: pigError,
    refetch: pigRefetch,
  } = useQuery(
    "pigData",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/Plans/UpdateObjective/${id}`
      );
      const returned = await response.json();
      return returned;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (Queryid !== null || Queryid !== undefined) {
      pigRefetch();
    }
  }, [Queryid]);
  useEffect(() => {
    if (pigData != undefined) {
      if (pigData.data) {
        setValue("objective_type", pigData.data[0].type);
        setValue("objective_name", pigData.data[0].objective_name);
      }
    }
  }, [pigData]);

  const onSubmit = (data: any) => {
    if ("Are you sure you want to update the objectives?") {
      updateUser(data);
    } else {
    }
  };

  if (cage_id == "") {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">Manage Pig</p>
          </div>
        </div>
        <div
          data-theme="light"
          className="card mx-auto text-base-content w-11/12 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>Plans Management</li>

                <li>View</li>

                <li className="font-bold">Update Objective</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="gap-2 w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
                <NormalInput
                  name="objective_name"
                  label="Objective Name"
                  register={register}
                  errors={errors}
                  readonly={Action == "View"}
                  required={true}
                  validationSchema={{ required: "Objective name is required" }}
                ></NormalInput>
                <SelectInput
                  name={"objective_type"}
                  label={"Type"}
                  register={register}
                  errors={errors}
                  options={[
                    {
                      value: "Vaccination",
                      display: "Vaccination",
                      disabled: false,
                    },
                    {
                      value: "Deworming",
                      display: "Deworming",
                      disabled: false,
                    },
                    {
                      value: "Feeding",
                      display: "Feeding",
                      disabled: false,
                    },
                    {
                      value: "Medicine Administration",
                      display: "Medicine Administration",
                      disabled: false,
                    },
                  ]}
                  required={true}
                  disabled={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
              </div>

              <div className="card-actions justify-end mt-6">
                <button
                  className={`btn btn-active btn-primary mx-4 ${
                    processing ? "loading" : ""
                  }`}
                >
                  Update
                </button>

                <Link
                  onClick={(e) => {
                    callCancel();
                  }}
                  className="btn btn-active btn-primary mx-4"
                  href={"/plans_management/veterinarian/List"}
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
