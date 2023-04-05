"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, View } from "@/hooks/usePigManagement";
import {
  validateNormal,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
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
import { IdGenerator } from "@/hooks/usePigManagement";
import { UpdateObjectiveItem } from "@/hooks/usePlan";
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
      item_name: "",
      item_quantity: "",
      item_id: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const evaluateCage = async (list: any) => {
    for (let i = 0; i < cageSelected.length; i++) {
      cageSelected[i].cage_id == data.cage_id;
      for (let j = 0; j < list.length; j++) {
        if (cageSelected[i].cage_id == list[j].cage_id) {
          if (cageSelected[i].selected_quantity >= list[j].value) {
            list[j] = {
              value: data.cage_id,
              display: "data.cage_name",
              disabled: Action == "View" || Action == "Remove" ? true : false,
              max: data.cage_capacity,
              current_capacity: data.current_caged,
            };
          }
        }
      }
    }

    return list;
  };
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

  const triggerUpdate = async () => {
    setCageList([]);
    const cage_list = data.data.PigletCageList;
    const listCage: any = [];
    cage_list.map((data: any, key: any) => {
      listCage.push({
        value: data.cage_id,
        display: data.cage_name,
        disabled: Action == "View" || Action == "Remove" ? true : false,
        max: data.cage_capacity,
        current_capacity: data.current_caged,
      });
    });
    listCage.push({
      value: pigData.data[0].cage_id,
      display: pigData.data[0].cage_name,
      disabled: Action == "View" || Action == "Remove" ? true : false,
      max: pigData.data[0].cage_capacity,
      current_capacity: pigData.data[0].current_caged,
    });
    const list = await evaluateCage(listCage);
  };

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
    const returned = await UpdateObjectiveItem(
      Queryid,
      data.item_id,
      data.item_quantity
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
      const response = await fetch(`${location.origin}/api/post/Plans/${id}`);
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
        setValue("item_id", pigData.data[0].item_id);
        setValue("item_name", pigData.data[0].item_name);
        setValue("item_quantity", pigData.data[0].item_quantity);
      }
    }
  }, [pigData]);

  const onSubmit = (data: any) => {
    if (Action == "Update") {
      updateUser(data);
    } else if (Action == "Remove") {
      exec_remove(data);
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
  } else if (Action != "Update" && Action != "Remove" && Action != "View") {
    return <PageNotFound></PageNotFound>;
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
                <li>Plan Management</li>

                <li>View</li>

                <li className="font-bold">Update Objective Item</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="gap-2 w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
                <SelectInput
                  name={"item_id"}
                  label={"Item"}
                  register={register}
                  errors={errors}
                  options={itemList}
                  required={true}
                  disabled={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
                <NormalInput
                  name="item_quantity"
                  label="Item Quantity"
                  register={register}
                  errors={errors}
                  readonly={Action == "View"}
                  required={true}
                  validationSchema={{ required: "Item Quantity is required" }}
                ></NormalInput>
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
