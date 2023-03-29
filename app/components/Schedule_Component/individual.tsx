"use client";

import { CreateIndividualSchedule } from "@/hooks/useSchedule";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NormalInput from "../FormCompsV2/NormalInput";
import RightDisplay from "../FormCompsV2/RightDisplay";
import SelectInput from "../FormCompsV2/SelectInput";

export function Individual() {
  const [processing, setProcessing] = useState(false);
  const [pig_list, setPigList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [activity, setActivity] = useState([]);
  const [item_list, setItemList] = useState<any[]>([]);
  const [useItem, setUseItem] = useState<
    {
      item_id: string;
      item_name: string;
      item_quantity: string;
    }[]
  >([]);
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
      enabled: false,
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
      const returned = await CreateIndividualSchedule(
        data.activity,
        data.operation_date,
        data.pig_id,
        useItem
      );
      if (returned.code == 200) {
        toast.success("Successfully added schedule");
        reset();
        setUseItem([]);
      } else {
        toast.error(returned.message);
      }
    }
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
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
          <div className="flex">
            <label htmlFor="my-modal-6" className={`btn my-auto`}>
              Choose Pig
            </label>
            <div className="divider divider-horizontal">OR</div>
            <NormalInput
              label={"Enter Pig Id"}
              name={"pig_id"}
              register={register}
              errors={errors}
              validationSchema={{
                required: "Pig Id is required",
              }}
              required={true}
            />
          </div>
          <SelectInput
            label={"Activity"}
            name={"activity"}
            register={register}
            errors={errors}
            options={activity}
            validationSchema={{
              required: "Activity is required",
            }}
            required={true}
          />{" "}
          <NormalInput
            label={"Activty Date"}
            name={"operation_date"}
            register={register}
            errors={errors}
            validationSchema={{
              required: "Date is required",
            }}
            type={"date"}
            required={true}
          />
        </div>
        <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Item Name*</span>
            </label>
            <select
              className={`select select-bordered w-full ${
                errors.item_name ? "select-error" : ""
              }`}
              placeholder="Select item"
              {...register("item_id")}
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
              name="item_id"
              render={({ message }) => (
                <p className="mt-2 text-sm  text-error">
                  <span className="font-medium">{message}</span>{" "}
                </p>
              )}
            />
          </div>
          <RightDisplay
            item_unit={
              watchItemName != ""
                ? item_list.find((item: any) => item.item_id == watchItemName)
                    .category_id == 1
                  ? "Kg"
                  : item_list.find((item: any) => item.item_id == watchItemName)
                      .category_id == 2
                  ? "Mg"
                  : item_list.find((item: any) => item.item_id == watchItemName)
                      .category_id == 3
                  ? "Mg"
                  : item_list.find((item: any) => item.item_id == watchItemName)
                      .category_id == 4
                  ? "Pc/s"
                  : "N/A"
                : "N/A"
            }
            label={"Item Quantity"}
            name={"item_quantity"}
            register={register}
            errors={errors}
          />
          <div className="card-actions ">
            <button
              className={`btn btn-active btn-primary mx-4 ${
                processing ? "loading" : ""
              }`}
              type={"button"}
              onClick={() => {
                if (watchItemName != "" && watcthItemQuantity != "") {
                  setUseItem([
                    ...useItem,
                    {
                      item_id: watchItemName,
                      item_name: item_list.find(
                        (item: any) => item.item_id == watchItemName
                      ).item_name,
                      item_quantity: watcthItemQuantity,
                    },
                  ]);
                  setValue("item_id", "", {
                    shouldValidate: false,
                  });
                  setValue("item_quantity", "", {
                    shouldValidate: false,
                  });
                } else {
                  setValue("item_id", watchItemName, {
                    shouldValidate: true,
                  });
                  setValue("item_quantity", watcthItemQuantity, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              Add to list
            </button>
          </div>
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
            onClick={() => {
              reset();
            }}
            className="btn mx-4"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="overflow-x-auto w-11/12 mx-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {useItem.length == 0 ? (
              <tr>
                <td className="text-center" colSpan={5}>
                  <span>No item added yet</span>
                </td>
              </tr>
            ) : (
              useItem.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.item_name}</td>
                    <td className="uppercase">{`${item.item_quantity} ${
                      item_list.find(
                        (item: any) => item.item_id == item.item_id
                      ).category_id == 1
                        ? "Kg"
                        : item_list.find(
                            (item: any) => item.item_id == item.item_id
                          ).category_id == 2
                        ? "Mg"
                        : item_list.find(
                            (item: any) => item.item_id == item.item_id
                          ).category_id == 3
                        ? "Mg"
                        : item_list.find(
                            (item: any) => item.item_id == item.item_id
                          ).category_id == 4
                        ? "Pc/s"
                        : "N/A"
                    }`}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          useItem.splice(index, 1);
                          setUseItem([...useItem]);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
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
    </>
  );
}
