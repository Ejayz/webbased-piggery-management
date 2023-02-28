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

export default function Page({ params }: any) {
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
    if (item_name == "" || category_id == "default" || item_description == "") {
      toast.error("All fields are required.");
      return false;
    }
    if (!(isItemName && isCategoryId && isItemDescription)) {
      toast.error("Please correct the inputs indicated in red.");
      return false;
    }
    if (params.Action == "Update") {
      if (!(isItemName && isCategoryId && isItemDescription)) {
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
    async function exec_get() {
      const returned = await GetCategory();

      if (returned.code == 200) {
        console.log(returned);
        returned.data.map((data: any, key: number) => {
          list.push({
            value: data.category_id,
            display: data.category_name,
            disabled: false,
          });
        });
        setCategoryList(list);
      }
    }
    exec_get();
  }, []);
  const exec_remove = async () => {
    const returned = await Remove(item_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  const updateUser = async () => {
    const returned = await Update(
      item_id,
      item_name,
      category_id,
      item_description
    );
    if (returned.code == 200) {
      resetState();
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
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
        setItemId(returned.data[0].item_id);
        setItemName(returned.data[0].item_name);
        setItemDescription(returned.data[0].item_description);
        setCategoryId(returned.data[0].category_id);
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

  if (item_id == "") {
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

                <li className="font-bold">Update</li>
              </ul>
            </div>
            <form
              onSubmit={verifyInput}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
                <InputBox
                  type={"text"}
                  label={"Item Name"}
                  placeholder={"Item Name"}
                  name={"ItemName"}
                  disabled={false}
                  className={"input input-bordered h-8"}
                  getter={item_name}
                  setter={setItemName}
                  required={true}
                  validation={validateNormal}
                  setIsValid={setIsItemName}
                />
                <SelectBox
                  label={"Category"}
                  name={"category"}
                  selected={category_id}
                  options={category_list}
                  disabled={false}
                  default_option={"Category"}
                  setter={setCategoryId}
                  required={true}
                  className={`input input-bordered h-10  `}
                  validation={validateSelect}
                  setIsValid={setIsCategoryId}
                />
                <InputBox
                  type={"text"}
                  label={"Item Description"}
                  placeholder={"Item Description"}
                  name={"Description"}
                  disabled={false}
                  className={"input input-bordered h-8"}
                  getter={item_description}
                  setter={setItemDescription}
                  required={true}
                  validation={validateNormal}
                  setIsValid={setIsItemDescription}
                />
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
