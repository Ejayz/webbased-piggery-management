"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Destock } from "@/hooks/useStockCard";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import { useQuery } from "react-query";
import { ErrorMessage } from "@hookform/error-message";
import { parse } from "path";
import RightDisplay from "@/components/FormCompsV2/RightDisplay";

interface RestockList {
  item_id: string;
  item_name: string;
  quantity: string;
  expiration_date: string;
  stock_id: string;
  item_net_weight: string;
}

export default function Page({ params }: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      stock_id: "",
      item_id: "",
      item_name: "",
      quantity: "",
      remarks: "",
      item_net_weight: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  const [file, setFile] = useState<FileList | null>();
  const [parsed, setParsed] = useState<any>([]);
  const [allowed, setIsAllowed] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [item_list, setItemList] = useState<any>([]);
  const id = params.ID;
  const [total_stock, setTotalStocks] = useState(0);
  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "getItemDetails",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/InventoryManagement/${id}`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data !== undefined) {
      if (data.data) {
        console.log(data.data);
        setValue("item_name", data.data[0].item_name);
        setValue("item_id", data.data[0].item_id);
        setTotalStocks(
          data.data[0].latest_closing_quantity / data.data[0].item_net_weight
        );
        setValue("stock_id", data.data[0].stock_id);
        setValue("item_net_weight", data.data[0].item_net_weight);
      } else {
        toast.error("Item not found");
      }
    }
  }, [data]);

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
    setParsed([]);
    reset();
  }

  const validateRepeatPassword = (value: string) => {
    const passwordValue = (
      document.getElementById("password") as HTMLInputElement
    )?.value;
    return value === passwordValue || "Password and Repeat password must match";
  };
  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/StockCard/worker/Destock");
    } else {
      router.push(`/StockCard/worker/Destock?msg=${message}&status=${status}`);
    }
  }
  const onSubmit = async (data: any) => {
    if (!confirm("Are you sure you want to destock?")) {
      return false;
    }
    {
      const returned = await Destock(
        data.stock_id,
        data.item_id,
        data.quantity,
        data.remarks,
        data.item_net_weight
      );
      if (returned.code == 200) {
        callCancel(returned.message, "success");
      } else {
        toast.error(returned.message);
      }
    }
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
                Manage Stock Card
              </p>
            </div>

            <div className="card w-11/12 mx-auto text-base-content  ">
              <div className="">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Stock Card</li>
                    <li className="font-bold">Destock</li>
                  </ul>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <span className="text-xl font-bold">
                    Total Stocks:
                    <span className="text-base font-extralight">
                      {total_stock}
                    </span>
                  </span>
                  <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2 gap-2">
                    <NormalInput
                      label="Item Name"
                      name="item_name"
                      register={register}
                      required={true}
                      errors={errors}
                      readonly={true}
                      type="text"
                      validationSchema={{
                        required: "Item name is required",
                      }}
                    />

                    <RightDisplay
                      item_unit={data?.data[0]?.item_unit}
                      label="Quantity"
                      name="quantity"
                      register={register}
                      required={true}
                      errors={errors}
                      type="number"
                      validationSchema={{
                        required: "Quantity to destock is required",
                        max: {
                          value: total_stock
                            ? parseInt(total_stock.toString())
                            : 0,
                          message:
                            "Quantity to destock must not be greater than total stock",
                        },
                        min: {
                          value: 1,
                          message:
                            "Quantity to destock must not be less than 1",
                        },
                      }}
                    />
                    <NormalInput
                      label="Remarks"
                      name="remarks"
                      register={register}
                      required={true}
                      errors={errors}
                      validationSchema={{
                        required: "Remarks is required.",
                      }}
                      type="text"
                    />
                  </div>{" "}
                  <div className="w-full h-auto grid grid-cols-4 my-2"></div>
                  <div className="w-full ml-2 grid grid-rows-1 lg:grid-cols-1 lg:grid-rows-none grid-cols-none"></div>
                  <div className="card-actions justify-end my-2">
                    <button
                      type="submit"
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
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
