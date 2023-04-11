"use client";

import { CreateIndividualSchedule } from "@/hooks/useSchedule";
import { ErrorMessage } from "@hookform/error-message";
import { DateTime } from "luxon";
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
  const [plan_list, setPlanList] = useState<any[]>([]);
  const [useItem, setUseItem] = useState<
    {
      operation_date: string;
      item_id: string;
      item_name: string;
      operation_id: string;
    }[]
  >([]);
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
      pig_id: "",
      activity: "",
      item_id: "",
      item_name: "",
      operation_date: "",
      schedule_option: "1",
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
      cacheTime: 0,
    }
  );

  const {
    register: RegisterPlan,
    handleSubmit: handleSubmitPlan,
    reset: resetPlan,
    watch: watchPlan,
    setValue: setValuePlan,
    trigger: triggerPlan,
    formState: {
      errors: errorsPlan,
      isSubmitSuccessful: isSubmitSuccessfulPlan,
      isSubmitting: isSubmittingPlan,
      isSubmitted: isSubmittedPlan,
    },
  } = useForm({
    defaultValues: {
      plan_id: "",
      pig_id: "",
    },
    criteriaMode: "all",
    mode: "all",
  });

  const {
    error: errorPlan,
    data: dataPlan,
    isLoading: isLoadingPlan,
    isError: isErrorPlan,
    refetch: refetchPlan,
  } = useQuery(
    "plan_list",
    async () => {
      const response = await fetch(`/api/post/Plans/getAllPlan`);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
  const watchPlanId = watchPlan("plan_id");
  const {
    error: errorPlanData,
    data: dataPlanData,
    isLoading: isLoadingPlanData,
    isError: isErrorPlanData,
    refetch: refetchPlanData,
  } = useQuery(
    "planData",
    async () => {
      const response = await fetch(
        `/api/post/Plans/getAllPlanData?plan_id=${watchPlanId}`
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
  useEffect(() => {
    if (watchPlanId != "") {
      refetchPlanData();
    }
  }, [watchPlanId]);

  useEffect(() => {
    if (dataPlanData) {
      if (dataPlanData.data.length > 0) {
        if (dataPlanData.code == 200) {
          if (watchPlanId != "") {
            setUseItem([]);
            const newDate = DateTime.now();
            dataPlanData.data.map((item: any) => {
              let addedDate = newDate.plus({ day: item.day }).toISODate();
              setUseItem((prev) => [
                ...prev,
                {
                  operation_date: addedDate,
                  item_id: item.item_id,
                  item_name: item.item_name,
                  operation_id: item.type,
                },
              ]);
            });
          } else {
            setUseItem([]);
          }
        }
      }
    }
  }, [dataPlanData, watchPlanId]);

  useEffect(() => {
    if (dataPlan) {
      if (dataPlan.data.length > 0) {
        if (dataPlan.code == 200) {
          setPlanList(
            dataPlan.data.map((item: any) => ({
              value: item.plan_id,
              display: item.plan_name,
              disabled: false,
            }))
          );
        }
      }
    }
  }, [dataPlan]);

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

  const watchActivity = watch("activity");
  const {
    isLoading: itemisLoading,
    isError: itemisError,
    data: itemdata,
    error: itemerror,
    refetch: itemrefetch,
  } = useQuery(
    ["item_list", watchActivity != ""],
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/InventoryManagement/getAllItems?type=${watchActivity}`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (watchActivity != "") {
      itemrefetch();
    }
  }, [watchActivity]);

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
        } else {
          setItemList([]);
        }
      } else {
        setItemList([]);
      }
    } else {
      setItemList([]);
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
  const watchScheduleType = watch("schedule_option");
  const watchOperationDate = watch("operation_date");
  useEffect(() => {
    if (watchScheduleType == "1") {
      setUseItem([]);
      reset();
    } else if (watchScheduleType == "") {
      setUseItem([]);
    } else if (watchScheduleType == "2") {
      if (watchOperationDate != "") {
        setUseItem([]);
        reset();
      }
    }
  }, [watchScheduleType]);

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
                            if (watchScheduleType == "1") {
                              setValue("pig_id", item.value, {
                                shouldValidate: true,
                              });
                            } else {
                              setValuePlan("pig_id", item.value, {
                                shouldValidate: true,
                              });
                            }
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
      <div className="className=flex w-full h-auto py-2 flex-col">
        <SelectInput
          label={"Schedule Option"}
          name={"schedule_option"}
          register={register}
          errors={errors}
          options={[
            {
              value: "1",
              display: "Custom",
              disabled: false,
            },
            {
              value: "2",
              display: "Plan",
              disabled: false,
            },
          ]}
          validationSchema={{
            required: "Select schedule option to view the form",
          }}
          required={true}
        />
      </div>

      {watchScheduleType == "1" ? (
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Item Name*</span>
              </label>
              <select
                className={`select select-bordered w-full ${
                  errors.item_id ? "select-error" : ""
                }`}
                placeholder="Select item"
                {...register("item_id", {
                  required: "Item is required",
                })}
              >
                <option value="">Item</option>
                {item_list == undefined
                  ? ""
                  : item_list?.map((item: any, index: number) => {
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
          </div>
          <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2"></div>
          <div className="card-actions mt-4">
            <button
              className={`btn btn-active btn-primary mx-4 ${
                processing ? "loading" : ""
              }`}
              type={"button"}
              onClick={() => {
                const result = trigger([
                  "item_id",
                  "operation_date",
                  "pig_id",
                  "activity",
                ]);
                if (watchItemName != "") {
                  setUseItem([
                    ...useItem,
                    {
                      operation_date: watchOperationDate,
                      item_id: watchItemName,
                      item_name: item_list.find(
                        (item: any) => item.item_id == watchItemName
                      ).item_name,
                      operation_id: watchActivity,
                    },
                  ]);
                  setValue("item_id", "", {
                    shouldValidate: false,
                  });
                } else {
                  setValue("item_id", watchItemName, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              Add to list
            </button>
          </div>{" "}
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
      ) : (
        <form
          onSubmit={handleSubmitPlan(onSubmit)}
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
                register={RegisterPlan}
                errors={errorsPlan}
                validationSchema={{
                  required: "Pig Id is required",
                }}
                required={true}
              />
            </div>
            <SelectInput
              label={"Plans"}
              name={"plan_id"}
              register={RegisterPlan}
              errors={errors}
              options={plan_list}
              validationSchema={{
                required: "Activity is required",
              }}
              required={true}
            />{" "}
          </div>
          <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2 gap-2"></div>
          <div className="card-actions mt-4">
            <button
              className={`btn btn-active btn-primary mx-4 ${
                processing ? "loading" : ""
              }`}
              type={"button"}
              onClick={() => {
                const result = trigger([
                  "item_id",
                  "operation_date",
                  "pig_id",
                  "activity",
                ]);
                if (watchItemName != "") {
                  setUseItem([
                    ...useItem,
                    {
                      operation_date: watchOperationDate,
                      item_id: watchItemName,
                      item_name: item_list.find(
                        (item: any) => item.item_id == watchItemName
                      ).item_name,
                      operation_id: watchActivity,
                    },
                  ]);
                  setValue("item_id", "", {
                    shouldValidate: false,
                  });
                } else {
                  setValue("item_id", watchItemName, {
                    shouldValidate: true,
                  });
                }
              }}
            >
              Add to list
            </button>
          </div>{" "}
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
      )}
      <div className="overflow-x-auto w-11/12 mx-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Item Name</th>
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
                    <th>{item.operation_date}</th>
                    <td>{item.item_name}</td>
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
