"use client";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useStockCard";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import { useQuery } from "react-query";
import { ErrorMessage } from "@hookform/error-message";

interface RestockList {
  item_id: string;
  item_name: string;
  quantity: string;
  expiration_date: string;
  stock_id: string;
  item_net_weight: string;
}

export default function Page() {
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
      item_name: "",
      quantity: "",
      expiration_date: "",
      attachment: "",
      stock_id: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  const [file, setFile] = useState<FileList | null>(null);
  const fileHandles = useRef<any>(null);
  const [parsed, setParsed] = useState<any>([]);
  const [allowed, setIsAllowed] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [item_list, setItemList] = useState<any>([]);
  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "getItems",
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
      enabled: false,
    }
  );

  console.log(data);
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      if (data.data) {
        setItemList(data.data);
      } else {
        setItemList([]);
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
    fileHandles.current.value = null;
    reset();
  }
  const restock = async () => {
    if (file == null || file.length == 0) {
      toast.error("Please add attachment");
      return;
    } else if (file != null && !file[0].type.includes("image")) {
      toast.error("Selected file is not an image.");
      return;
    } else if (parsed.length == 0) {
      toast.error("Please add items to restock");
      return;
    } else {
      if (!confirm("Are you sure you want to restock?")) {
        return false;
      }
      const returned = await Create(parsed, file);

      if (returned.code == 200) {
        console.log(returned);
        toast.success("Restock Success");
        resetState();
      } else {
        toast.error("Restock Failed");
      }
    }
  };

  const validateRepeatPassword = (value: string) => {
    const passwordValue = (
      document.getElementById("password") as HTMLInputElement
    )?.value;
    return value === passwordValue || "Password and Repeat password must match";
  };

  const onSubmit = (data: any) => {
    const item_name = item_list.find(
      (item: any) => item.item_id == data.item_name
    ).item_name;
    const stock_id = item_list.find(
      (item: any) => item.item_id == data.item_name
    ).stock_id;
    const item_net_weight = item_list.find(
      (item: any) => item.item_id == data.item_name
    ).item_net_weight;

    setParsed([
      ...parsed,
      {
        item_id: data.item_name,
        item_name: item_name,
        quantity: data.quantity,
        expiration_date: data.expiration_date,
        stock_id: stock_id,
        item_net_weight: item_net_weight,
      },
    ]);
    reset();
  };

  console.log(file);

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
                Manage Stock Card
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Stock Card</li>
                    <li className="font-bold">Restock</li>
                  </ul>
                </div>
                <div className="alert alert-info shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Restock items based on one receipt at a time.</span>
                  </div>
                </div>
                <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Pick a receipt</span>
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                      ref={fileHandles}
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2 gap-2">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Item Name*</span>
                      </label>
                      <select
                        required={true}
                        className={`select select-bordered w-full max-w-xs ${
                          errors.item_name ? "select-error" : ""
                        }`}
                        placeholder="Select item"
                        {...register("item_name", {
                          required: "This field is required",
                        })}
                      >
                        <option value="">Item</option>
                        {item_list.map((item: any, index: number) => {
                          return (
                            <option key={index} value={item.item_id}>
                              {item.item_name}
                            </option>
                          );
                        })}
                      </select>

                      <ErrorMessage
                        errors={errors}
                        name="item_name"
                        render={({ message }) => (
                          <p className="mt-2 text-sm  text-error">
                            <span className="font-medium">{message}</span>{" "}
                          </p>
                        )}
                      />
                    </div>

                    <NormalInput
                      label="Quantity"
                      name="quantity"
                      register={register}
                      required={true}
                      errors={errors}
                      type="number"
                      validationSchema={{
                        required: "Total quantity is required",
                      }}
                    />
                    <NormalInput
                      label="Expiration Date"
                      name="expiration_date"
                      register={register}
                      required={false}
                      errors={errors}
                      validationSchema={{}}
                      type="date"
                    />
                  </div>{" "}
                  <div className="w-full h-auto grid grid-cols-4 my-2">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Add to list
                    </button>
                  </div>
                  <div className="w-full ml-2 grid grid-rows-1 lg:grid-cols-1 lg:grid-rows-none grid-cols-none">
                    <div className="overflow-x-auto">
                      <table className="table table-compact w-full">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Expiration Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsed.length == 0 ? (
                            <tr>
                              <td className="text-center" colSpan={5}>
                                <span>No item added yet</span>
                              </td>
                            </tr>
                          ) : (
                            parsed.map((item: any, index: number) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.item_name}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    {item.expiration_date == ""
                                      ? "N/A"
                                      : item.expiration_date}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-error"
                                      onClick={() => {
                                        parsed.splice(index, 1);
                                        setParsed([...parsed]);
                                      }}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g
                                          id="SVGRepo_bgCarrier"
                                          stroke-width="0"
                                        ></g>
                                        <g
                                          id="SVGRepo_tracerCarrier"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <path
                                            d="M10 12V17"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          ></path>
                                          <path
                                            d="M14 12V17"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          ></path>
                                          <path
                                            d="M4 7H20"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          ></path>
                                          <path
                                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          ></path>
                                          <path
                                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          ></path>
                                        </g>
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-actions justify-end my-2">
                    <button
                      type="button"
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                      onClick={restock}
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
