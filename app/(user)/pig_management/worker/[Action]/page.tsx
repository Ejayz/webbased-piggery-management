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
import TextArea from "@/components/FormCompsV2/TextArea";
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
  const [batchList, setBatchList] = useState<SelectInter[]>([]);
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
      pig_id: "",
      cage_id: "",
      pig_tag: "",
      pig_type: "",
      status: "",
      weight: "",
      remarks: "",
      batch_id: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { isLoading, error, isFetching, data, refetch } = useQuery(
    "pigDetails",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/getFormDetailAction`
      );
      const date = new Date();
      const epochTime = date.getTime() / 1000;
      const data = await response.json();
      data.time = epochTime;
      return data;
    },
    {}
  );
  const {
    data: batches,
    isLoading: batchLoading,
    error: batchError,
    refetch: batchRefetch,
  } = useQuery(
    "getBatches",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/PigManagement/getBatch`
      );
      const data = await response.json();
      return data;
    },
    {}
  );

  useEffect(() => {
    if (batches !== undefined) {
      if (batches.code == 200) {
        let List: any = [];
        batches.data.map((item: any, key: number) => {
          List.push({
            value: item.batch_id,
            display: item.batch_name,
            disabled: false,
          });
        });
        setBatchList(List);
      }
    }
  }, [batches]);

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

  const triggerUpdate = async (data: any) => {
    setCageList([]);
    const cage_list = data.data.PigletCageList;
    console.log(cage_list);
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

    if (listCage.find((item: any) => item.value == data.cage_id) == undefined) {
      listCage.push({
        value: pigData.data[0].cage_id,
        display: pigData.data[0].cage_name,
        disabled: Action == "View" || Action == "Remove" ? true : false,
        max: pigData.data[0].cage_capacity,
        current_capacity: pigData.data[0].current_caged,
      });
    }
    const list = await evaluateCage(listCage);
    setCageList(list);
    setValue("pig_id", id);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.code == 200) {
        triggerUpdate(data);
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
    const returned = await Update(
      data.pig_id,
      data.pig_tag,
      data.status,
      data.cage_id,
      data.weight,
      data.remarks,
      data.pig_type,
      data.batch_id
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
      router.push("/pig_management/worker/List");
    } else {
      router.push(
        `/pig_management/worker/List?msg=${message}&status=${status}`
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
    isFetching: pigIsFetching,
  } = useQuery(
    "pigData",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/${id}`
      );
      const returned = await response.json();
      return returned;
    },
    {}
  );

  useEffect(() => {
    if (Queryid !== null || Queryid !== undefined) {
      pigRefetch();
    }
  }, [Queryid]);
  useEffect(() => {
    if (pigData != undefined) {
      setValue("pig_id", pigData.data[0].pig_id);
      setValue("status", pigData.data[0].status);
      setValue("weight", pigData.data[0].weight);
      setValue("pig_tag", pigData.data[0].pig_tag);
      setValue("pig_type", pigData.data[0].pig_type);
      setValue("batch_id", pigData.data[0].batch_id);
      refetch();
    }
  }, [pigData]);

  useEffect(() => {
    if (pigData != undefined) {
      setValue("cage_id", pigData.data[0].cage_id);
    }
  }, [cageList]);
  const onSubmit = (data: any) => {
    if (params.Action == "Update") {
      if (!(isCageCapacity && isCageType && isCageName)) {
        setProcessing(false);
        toast.error("Please correct the inputs indicated in red.");
        return false;
      }
      var isOk = confirm("are you sure you want to update?");
      setIsSubmitting(true);
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

  if (cage_id == "" || isFetching) {
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
        <div className=" mx-auto text-base-content w-11/12 ">
          <div className="">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>Pig Management</li>
                <li>View</li>
                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="gap-2 w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
                <NormalInput
                  name="pig_id"
                  label="Pig Id"
                  register={register}
                  errors={errors}
                  readonly={true}
                  required={true}
                  validationSchema={{ required: "Pig Id is required" }}
                ></NormalInput>
                <SelectInput
                  name={"cage_id"}
                  label={"Cage"}
                  register={register}
                  errors={errors}
                  options={cageList}
                  required={true}
                  disabled={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
                <SelectInput
                  name={"pig_type"}
                  label={"Pig Type"}
                  register={register}
                  errors={errors}
                  options={[
                    {
                      display: "Gilt",
                      value: "Gilt",
                      disabled: false,
                    },
                    {
                      display: "Sow",
                      value: "Sow",
                      disabled: false,
                    },
                    {
                      display: "Boar",
                      value: "Boar",
                      disabled: false,
                    },
                    {
                      display: "Piglet",
                      value: "Piglet",
                      disabled: false,
                    },
                    {
                      display: "Farrowing",
                      value: "Farrowing",
                      disabled: false,
                    },
                    {
                      display: "Weaner",
                      value: "Weaner",
                      disabled: false,
                    },
                  ]}
                  required={true}
                  disabled={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
              </div>

              <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                <NormalInput
                  name={"pig_tag"}
                  label={"Pig Tag"}
                  register={register}
                  errors={errors}
                  required={true}
                  readonly={
                    Action == "View" || Action == "Remove" ? true : false
                  }
                  validationSchema={{ required: "This field is required" }}
                ></NormalInput>
                <NormalInput
                  name={"weight"}
                  label={"Weight(kg)"}
                  register={register}
                  errors={errors}
                  readonly={
                    Action == "View" || Action == "Remove" ? true : false
                  }
                  validationSchema={{
                    required: "This field is required",
                    min: {
                      value: 0.1,
                      message: "Weight must be greater than 0.1",
                    },
                  }}
                  required={true}
                ></NormalInput>
                <SelectInput
                  name={"status"}
                  label={"Status"}
                  register={register}
                  disabled={true}
                  options={[
                    {
                      value: "active",
                      display: "Active",
                      disabled:
                        Action == "View" || Action == "Remove" ? true : false,
                    },
                    {
                      value: "deceased",
                      display: "Deceased",
                      disabled:
                        Action == "View" || Action == "Remove" ? true : false,
                    },
                    {
                      value: "quarantined",
                      display: "Quarantined",
                      disabled:
                        Action == "View" || Action == "Remove" ? true : false,
                    },
                    {
                      value: "sold",
                      display: "Sold",
                      disabled:
                        Action == "View" || Action == "Remove" ? true : false,
                    },
                  ]}
                  errors={errors}
                  required={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
                {Action == "View" || Action == "Remove" ? (
                  <></>
                ) : (
                  <TextArea
                    name={"remarks"}
                    label={"Remarks"}
                    register={register}
                    disabled={true}
                    errors={errors}
                    required={true}
                    validationSchema={{ required: "This field is required" }}
                  />
                )}
                <SelectInput
                  name={"batch_id"}
                  label={"Batch"}
                  register={register}
                  disabled={true}
                  options={batchList}
                  errors={errors}
                  required={true}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
              </div>
              <div className="card-actions justify-end mt-6">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-warning mx-4 ${
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
                  className="btn btn-active mx-4"
                  href={"/pig_management/worker/List"}
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
