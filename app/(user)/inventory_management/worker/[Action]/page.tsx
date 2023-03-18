"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { GetCategory, Remove, Update, View } from "@/hooks/useInventory";
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

export default function Page({ params }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      item_id: "",
      item_name: "",
      category_id: "",
      item_description: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const [item_id, setItemId] = useState("");
  const [item_name, setItemName] = useState("");
  const [category_id, setCategoryId] = useState("default");
  const [item_description, setItemDescription] = useState("");
  const [item_quantity, setItemQuantity] = useState("");
  const [item_unit, setItemUnit] = useState("default");
  const [item_net_weight, setItemNetWeight] = useState("");

  const [isItemName, setIsItemName] = useState(true);
  const [isCategoryId, setIsCategoryId] = useState(true);
  const [isItemDescription, setIsItemDescription] = useState(true);
  const [isItemQuantity, setIsItemQuantity] = useState(true);
  const [isItemUnit, setIsItemUnit] = useState(true);
  const [category_list, setCategoryList] = useState([]);
  const [isItemNetWeight, setIsItemNetWeight] = useState(true);
  let list: any = [];

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  const [processing, setProcessing] = useState(false);
  let message: any = [];
  function resetState() {
    setItemName("");
    setCategoryId("default");
    setItemDescription("");
    setItemQuantity("");
    setItemUnit("default");
    setItemNetWeight("");
  }
  const verifyInput = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    if (item_name == "" || category_id == "default" || item_description == "") {
      setProcessing(false);
      toast.error("All fields are required.");
      return false;
    }
    if (!(isItemName && isCategoryId && isItemDescription)) {
      setProcessing(false);
      toast.error("Please correct the inputs indicated in red.");
      return false;
    }
  };
  useEffect(() => {
    async function exec_get() {
      const returned = await GetCategory();

      if (returned.code == 200) {
        console.log(returned);
        returned.data.map((data: any, key: number) => {
          list.push({
            value: data.category_id,
            display: data.category_name,
            disabled: Action == "View" || Action == "Remove" ? true : false,
          });
        });
        setCategoryList(list);
      }
    }
    exec_get();
  }, []);
  const exec_remove = async (data: any) => {
    const returned = await Remove(data.item_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setProcessing(false);
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setProcessing(false);
      setIsSubmitting(false);
    }
  };

  const updateUser = async (data: any) => {
    const returned = await Update(
      data.item_id,
      data.item_name,
      data.category_id,
      data.item_description
    );
    if (returned.code == 200) {
      resetState();
      setProcessing(false);
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setProcessing(false);
      setIsSubmitting(false);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/inventory_management/worker/List");
    } else {
      router.push(
        `/inventory_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }
  useEffect(() => {
    const exec = async () => {
      const returned = await View(Queryid);

      if (returned.code == 200) {
        setValue("item_id", returned.data[0].item_id);
        setValue("item_name", returned.data[0].item_name);
        setValue("item_description", returned.data[0].item_description);
        setValue("category_id", returned.data[0].category_id);
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
  const onSubmit = (data: any) => {
    if (params.Action == "Update") {
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

  if (Action != "Update" && Action != "Remove" && Action != "View") {
    return <PageNotFound></PageNotFound>;
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">
              Manage Inventory
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
                <li>Inventory Management</li>
                <li>View</li>
                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                <NormalInput
                  readonly={
                    Action == "View" || Action == "Remove" ? true : false
                  }
                  label={"Item Name"}
                  name={"item_name"}
                  register={register}
                  errors={errors}
                  required={true}
                  validationSchema={{
                    required: "This field is required",
                  }}
                />
                <SelectInput
                  label={"Category"}
                  name={"category_id"}
                  register={register}
                  errors={errors}
                  options={category_list}
                  required={true}
                  disabled={
                    Action == "View" || Action == "Remove" ? true : false
                  }
                  validationSchema={{ required: "This field is required" }}
                />
                <NormalInput
                  label={"Item Description"}
                  name={"item_description"}
                  register={register}
                  errors={errors}
                  required={true}
                  readonly={
                    Action == "View" || Action == "Remove" ? true : false
                  }
                  validationSchema={{
                    required: "This field is required",
                    max_length: {
                      value: 200,
                      message: "Maximum of 100 characters",
                    },
                  }}
                />
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
                  href={"/inventory_management/worker/List"}
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
