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
import RightDisplay from "@/components/FormCompsV2/RightDisplay";
import { DateTime } from "luxon";
import SearchInput from "@/components/FormCompsV2/SearchInput";

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
      item_id: "",
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
  const [item_lists, setItemList] = useState<any>([]);
  const [item_list, setItems] = useState<any[]>([]);
  const [show, showModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "getItems",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/InventoryManagement/getAllItem`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      console.log(data);
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(data);
  useEffect(() => {
    refetch();
  }, []);
  const watchItemName = watch("item_name");
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
    } else if (file != null && !(file[0].size <= 3145728)) {
      toast.error("Selected file is too large.");
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
        toast.error(returned.message);
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
      (item: any) => item.item_id == data.item_id
    ).item_name;
    const stock_id = item_list.find(
      (item: any) => item.item_id == data.item_id
    ).stock_id;
    const item_net_weight = item_list.find(
      (item: any) => item.item_id == data.item_id
    ).item_net_weight;

    setParsed([
      ...parsed,
      {
        item_id: data.item_id,
        item_name: item_name,
        quantity: data.quantity,
        expiration_date: data.expiration_date,
        stock_id: stock_id,
        item_net_weight: item_net_weight,
      },
    ]);
    reset();
  };
  const {
    register: searchItem,
    handleSubmit: searchItemSubmit,
    formState: { errors: searchItemErrors },
    setValue: searchItemSetValue,
    watch: searchItemWatch,
    reset: searchItemReset,
  } = useForm({
    defaultValues: {
      keyword: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  console.log(file);
  const searchItemWatchKeyword = searchItemWatch("keyword");
  const {
    data: ItemsData,
    error: ItemsError,
    isLoading: ItemsLoading,
    refetch: ItemsRefetch,
  } = useQuery("items", async () => {
    const res = await fetch(
      `/api/get/Schedule/getItem?keyword=${searchItemWatchKeyword}`
    );
    const data = await res.json();
    return data;
  });
  useEffect(() => {
    if (ItemsData) {
      if (ItemsData.code == 200) {
        setItems(ItemsData.data);
      }
    }
  }, [ItemsData]);
  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <input
          type="checkbox"
          checked={show}
          readOnly={true}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <label
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => showModal(false)}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">
              Search for items that will be used in this activity.
            </h3>
            <div className="form-control">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ItemsRefetch();
                }}
                className="input-group"
              >
                <div className="form-control">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search…"
                      className="input input-bordered"
                      {...searchItem("keyword", {
                        required: {
                          value: true,
                          message: "Keyword is required",
                        },
                      })}
                    />
                    <button className="btn btn-square">
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
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              <label className="label overflow-y-auto">
                <table className="table table-compact w-full label-text-alt">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item_list.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item_name}</td>
                        <td>{item.item_description}</td>
                        <td>
                          <label
                            onClick={() => {
                              setValue("item_id", item.item_id, {
                                shouldValidate: true,
                              });
                              setValue("item_name", item.item_name),
                                {
                                  shouldValidate: true,
                                };
                              showModal(false);
                              searchItemReset();
                            }}
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
        <div className="w-full  h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage Stock Card
              </p>
            </div>

            <div className="card w-11/12 mx-auto  text-base-content  ">
              <div className="">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Stock Card</li>
                    <li className="font-bold">Restock</li>
                  </ul>
                </div>
                <div className="alert alert-info w-3/4 ml-4 shadow-lg">
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
                <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-1 gap-2">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-lg">Pick a receipt</span>
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                      ref={fileHandles}
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                    <label className="label">
                      <span className="label-text-alt font-extralight font-mono text-sm">
                        Maximum file size allowed is 3 MB.
                      </span>
                    </label>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2 gap-2">
                    <SearchInput
                      label="Selected Item"
                      type="text"
                      register={register}
                      name="item_name"
                      errors={errors}
                      validationSchema={{
                        required: "Item is required",
                      }}
                      required={true}
                      showModal={showModal}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="item_id"
                      render={({ message }) => (
                        <p className="mt-2 text-sm  text-error">
                          <span className="font-medium">{message}</span>{" "}
                        </p>
                      )}
                    />
                    <RightDisplay
                      item_unit={
                        watchItemName != ""
                          ? item_list.find(
                              (item: any) => item.item_name == watchItemName
                            ).item_unit
                          : "N/A"
                      }
                      label="Quantity"
                      name="quantity"
                      register={register}
                      required={true}
                      errors={errors}
                      type="number"
                      validationSchema={{
                        required: "Total quantity is required",
                        min: {
                          value: 1,
                          message: "Quantity must be greater than 0",
                        },
                      }}
                    />
                    <NormalInput
                      label="Expiration Date"
                      name="expiration_date"
                      register={register}
                      required={false}
                      errors={errors}
                      validationSchema={{
                        min: {
                          value: new Date(),
                          message: "Expiration date must be greater than today",
                        },
                        max: {
                          value: DateTime.now().plus({ year: 5 }).toISO(),
                          message:
                            "Expiration date must be less than 6 year from today",
                        },
                      }}
                      type="date"
                    />
                  </div>{" "}
                  <div className="w-full h-auto grid grid-cols-2 lg:grid-cols-4 my-2">
                    <button
                      className={`btn btn-info mx-4 ${
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
                                  <td className="uppercase">{`${
                                    item.quantity
                                  } ${
                                    item_list.find(
                                      (items: any) =>
                                        items.item_id == item.item_id
                                    ).item_unit
                                  }`}</td>
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
                                          strokeWidth="0"
                                        ></g>
                                        <g
                                          id="SVGRepo_tracerCarrier"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <path
                                            d="M10 12V17"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M14 12V17"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M4 7H20"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                      className={`btn btn-active btn-success mx-4 ${
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
                      Clear
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
