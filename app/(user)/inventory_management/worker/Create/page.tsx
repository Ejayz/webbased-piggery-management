"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import {} from "@/hooks/useBreedManagement";
import InputBox from "@/components/FormComponents/inputbox";
import { toast } from "react-toastify";
import {
  validateNormal,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
} from "@/hooks/useValidation";
import PasswordBox from "@/components/FormComponents/passwordBox";
import SelectBox from "@/components/FormComponents/selectBox";
import { GetCategory, Create } from "@/hooks/useInventory";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      item_id: "",
      item_name: "",
      category_id: "",
      item_description: "",
      item_unit: "",
      item_net_weight: "",
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

  const [processing, setProcessing] = useState(false);

  const router = useRouter();
  const loading = getUserInfo();
  let list: any = [];
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

  const validate = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    if (
      item_name == "" ||
      category_id == "default" ||
      item_description == "" ||
      item_quantity == "" ||
      item_unit == "default"
    ) {
      setProcessing(false);
      toast.error("All feilds are required.");
      return false;
    }

    if (
      !(
        isItemName &&
        isCategoryId &&
        isItemDescription &&
        isItemQuantity &&
        isItemUnit
      )
    ) {
      setProcessing(false);
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }
  };

  async function createUser(data: any) {
    const returned = await Create(
      data.item_name,
      data.category_id,
      data.item_description,
      data.item_unit,
      data.item_net_weight
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
  useEffect(() => {
    async function exec_get() {
      const returned = await GetCategory();
      console.log(returned);
      if (returned.code == 200) {
        if (returned.data.length !== 0) {
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
    }
    exec_get();
  }, []);

  const onSubmit = (data: any) => {
    if (!confirm("Are you sure you want to create?")) {
      setProcessing(false);
      return false;
    }
    createUser(data);
  };

  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <div className="w-full  h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage Inventory
              </p>
            </div>
            <div className=" w-11/12 mx-auto  text-base-content  ">
              <div className="">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Inventory</li>
                    <li className="font-bold">Create Inventory</li>
                  </ul>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none gap-2 grid-cols-none grid-rows-3">
                    <NormalInput
                      name={"item_name"}
                      label={"Item Name"}
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                    <SelectInput
                      name="category_id"
                      label={"Item Category"}
                      register={register}
                      options={category_list}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></SelectInput>
                    <NormalInput
                      name={"item_description"}
                      label={"Item Description"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"textarea"}
                      validationSchema={{
                        required: "This field is required",
                        maxLength: {
                          value: 200,
                          message: "Maximum 100 characters allowed",
                        },
                      }}
                    ></NormalInput>
                  </div>

                  <div className="w-full ml-2 grid lg:grid-cols-3 gap-2 lg:grid-rows-none grid-cols-none grid-rows-3">
                    <SelectInput
                      name="item_unit"
                      label={"Item Unit"}
                      register={register}
                      errors={errors}
                      required={true}
                      options={[
                        {
                          value: "sack",
                          display: "Sacks",
                          disabled: false,
                        },
                        {
                          value: "kg",
                          display: "Kilo Gram",
                          disabled: false,
                        },
                        {
                          value: "mg",
                          display: "Milli Gram",
                          disabled: false,
                        },
                        {
                          value: "pcs",
                          display: "Pieces",
                          disabled: false,
                        },
                      ]}
                      validationSchema={{ required: "This field is required" }}
                    ></SelectInput>
                    <NormalInput
                      name={"item_net_weight"}
                      label={"Item Net Weight"}
                      required={true}
                      register={register}
                      errors={errors}
                      type={"number"}
                      validationSchema={{ required: "This field is required" }}
                    ></NormalInput>
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
