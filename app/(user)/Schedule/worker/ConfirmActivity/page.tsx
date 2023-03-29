"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useCageManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import { Individual } from "@/components/Schedule_Component/individual";
import {
  ConfirmIndividualSchedule,
  CreateIndividualSchedule,
} from "@/hooks/useSchedule";
import { useQuery } from "react-query";
import { ErrorMessage } from "@hookform/error-message";
import RightDisplay from "@/components/FormCompsV2/RightDisplay";
import { DateTime } from "luxon";

export default function Page() {
  const [processing, setProcessing] = useState(false);
  const [pig_list, setPigList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [activity, setActivity] = useState([]);
  const [item_list, setItemList] = useState<any[]>([]);
  const router=useRouter()
  const [useItem, setUseItem] = useState<
    {
      item_id: string;
      item_name: string;
      item_quantity: string;
    }[]
  >([]);

  const [allowed, setIsAllowed] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      pig_id: "",
      activity: "",
      item_id: "",
      item_name: "",
      item_quantity: "",
      operation_date: "",
    },
    criteriaMode: "all",
    mode: "all",
  });
  const id = useSearchParams().get("id");

  const {
    error: ConfirmError,
    data: ConfirmData,
    refetch: ConfirmRefetch,
  } = useQuery(
    ["getConfirm", id !== undefined],
    async () => {
      const response = await fetch(`/api/get/Today/GetSchedule/${id}`);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    error: ItemDetailsError,
    data: ItemDetailsData,
    refetch: ItemDetailsRefetch,
  } = useQuery(
    ["getItemDetails", id !== undefined],
    async () => {
      const response = await fetch(`/api/get/Today/ItemGet/${id}`);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(ConfirmData);

  useEffect(() => {
    if (ConfirmData != undefined) {
      if (ConfirmData.code == 200) {
        setValue("pig_id", ConfirmData.data[0].pig_id);
        setValue("activity", ConfirmData.data[0].operation_type_id);
        setValue("operation_date", ConfirmData.data[0].operation_date);
      }
    }
  }, [ConfirmData]);

  useEffect(() => {
    if (ItemDetailsData !== undefined) {
      if (ItemDetailsData.code == 200) {
        ItemDetailsData.data.map((items: any) => {
          setConfirmed([
            ...item_list,
            {
              item_id: items.item_id,
              item_name: items.item_name,
              item_quantity: items.quantity,
              item_net_weight: items.item_net_weight,
            },
          ]);
        });
      }
    }
  }, [ItemDetailsData]);
  console.log(item_list);

  const { isLoading, isError, data, error, refetch } = useQuery(
    "pig_list",
    async () => {
      const response = await fetch(
        `/api/post/Schedule/Pigs/getPigs?keyword=${
          keyword == "" ? "" : keyword
        }`
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );

  const {
    isLoading: typeisLoading,
    isError: typeisError,
    data: typedata,
    error: typeerror,
    refetch: typerefetch,
  } = useQuery(
    "type_list",
    async () => {
      const response = await fetch(`/api/post/Schedule/Pigs/getType`);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
  const watchItemName = watch("item_id");
  const watcthItemQuantity = watch("item_quantity");
  const {
    isLoading: itemisLoading,
    isError: itemisError,
    data: itemdata,
    error: itemerror,
    refetch: itemrefetch,
  } = useQuery(
    "item_list",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/InventoryManagement/getAllItems`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
  const [confirmed, setConfirmed] = useState<
    {
      operation_item_details_id: string;
    }[]
  >([]);
  const watch_pig_id = watch("pig_id");
  useEffect(() => {
    if (data) {
      if (data.code === 200) {
        if (data.data) {
          setPigList(
            data.data.map((item: any) => ({
              value: item.pig_id,
              display: item.pig_id,
              disabled: false,
            }))
          );
        }
      }
    }
  }, [data]);
  useEffect(() => {
    if (typedata) {
      if (typedata.code === 200) {
        if (typedata.data) {
          setActivity(
            typedata.data.map((item: any) => ({
              value: item.operation_type_id,
              display: item.operation_name,
              disabled: false,
            }))
          );
        }
      }
    }
  }, [typedata]);

  useEffect(() => {
    if (itemdata) {
      if (itemdata.code === 200) {
        if (itemdata.data) {
          setItemList(itemdata.data);
        }
      }
    }
  }, [itemdata]);

  useEffect(() => {
    if (keyword == "") {
      refetch();
    }
  }, [keyword]);

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    if (!confirm("Are you sure you want to add this schedule?")) {
      return;
    } else {
      const returned = await ConfirmIndividualSchedule(id);
      if (returned.code == 200) {
        toast.success(returned.message);
        reset();
        setUseItem([]);
      } else {
        toast.error(returned.message);
      }
    }
  };
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
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Schedule</li>
                    <li className="font-bold">Create Schedule</li>
                  </ul>
                </div>

                {/* The button to open modal */}

                {/* Put this part before </body> tag */}
                <input
                  type="checkbox"
                  id="my-modal-6"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box relative">
                    <label
                      htmlFor="my-modal-6"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h3 className="font-bold text-lg">
                      Search the pig you want to add schedule
                    </h3>
                    <div className="form-control">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          refetch();
                        }}
                        className="input-group"
                      >
                        <input
                          type="text"
                          placeholder="Search…"
                          className="input input-bordered w-full"
                          value={keyword}
                          onChange={(e) => {
                            setKeyword(e.target.value);
                          }}
                        />
                        <button type="submit" className="btn btn-square">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </form>
                      <label className="label overflow-y-auto">
                        <table className="table table-compact w-full label-text-alt">
                          <thead>
                            <tr>
                              <th>Pig Id</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pig_list.map((item, index) => (
                              <tr key={index}>
                                <td>{item.display}</td>
                                <td>
                                  <label
                                    onClick={() => {
                                      setValue("pig_id", item.value, {
                                        shouldValidate: true,
                                      });
                                    }}
                                    htmlFor="my-modal-6"
                                    className="link underline hover:text-primary"
                                  >
                                    Select
                                  </label>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </label>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2">
                    <span>
                      <span className="text-xl font-bold">Schedule Id:</span>
                      <span className="font-mono font-bold">
                        {ConfirmData?.data[0].operation_id}
                      </span>
                    </span>
                    <span>
                      <span className="text-xl font-bold">Operation Date:</span>
                      <span className="font-mono font-bold">
                        {DateTime.fromISO(ConfirmData?.data[0].operation_date)
                          .setZone("Asia/Manila")
                          .toFormat("EEEE',' MMM d',' yyyy")}
                      </span>
                    </span>
                    <span>
                      <span className="text-xl font-bold">Patient:</span>
                      <span className="font-mono font-bold">
                        {ConfirmData?.data[0].pig_id}
                      </span>
                    </span>
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2"></div>
                  <div className="overflow-x-auto w-11/12 mx-auto">
                    <table className="table table-compact w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Item Name</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ItemDetailsData?.data.length == 0 ? (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              <span>No item added yet</span>
                            </td>
                          </tr>
                        ) : (
                          ItemDetailsData?.data.map(
                            (item: any, index: number) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1} </td>
                                  <td>{item.item_name}</td>
                                  <td className="uppercase">{`${
                                    item.quantity
                                  } `}</td>
                                </tr>
                              );
                            }
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-actions justify-end mt-6">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        processing ? "loading" : ""
                      }`}
                    >
                      Confirm
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        reset();
                      }}
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
