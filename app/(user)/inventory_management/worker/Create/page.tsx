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

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

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

  const [reset, setReset] = useState(false);
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
    setReset(!reset);
    setItemName("");
    setCategoryId("default");
    setItemDescription("");
    setItemQuantity("");
    setItemUnit("default");
    setItemNetWeight("");
  }

  const validate = async (e: any) => {
    e.preventDefault();
    if (
      item_name == "" ||
      category_id == "default" ||
      item_description == "" ||
      item_quantity == "" ||
      item_unit == "default"
    ) {
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

  async function createUser() {
    const returned = await Create(
      item_name,
      category_id,
      item_description,
      item_quantity,
      item_unit,
      item_net_weight
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
    } else {
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
                Manage Inventory
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Inventory</li>
                    <li className="font-bold">Create Inventory</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
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
                      reset={reset}
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
                      reset={reset}
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
                      reset={reset}
                    />
                  </div>

                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
                    <InputBox
                      type={"number"}
                      label={"Item Quantity"}
                      placeholder={"Item Quantity"}
                      name={"quantity"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={item_quantity}
                      setter={setItemQuantity}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsItemQuantity}
                      reset={reset}
                    />{" "}
                    <SelectBox
                      label={"Unit"}
                      name={"Unit"}
                      selected={item_unit}
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
                      disabled={false}
                      default_option={"Units"}
                      setter={setItemUnit}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsItemUnit}
                      reset={reset}
                    />{" "}
                    <InputBox
                      type={"number"}
                      label={"Item Net Weight"}
                      placeholder={"Item Net Weight"}
                      name={"net_weight"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={item_net_weight}
                      setter={setItemNetWeight}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsItemNetWeight}
                      reset={reset}
                    />
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
