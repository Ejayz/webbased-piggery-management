"use client";

import {
  CreateCageSchedule,
  CreateIndividualSchedule,
} from "@/hooks/useSchedule";
import FullCalendar from "@fullcalendar/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NormalInput from "../FormCompsV2/NormalInput";
import RightDisplay from "../FormCompsV2/RightDisplay";
import SelectInput from "../FormCompsV2/SelectInput";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SearchInput from "../FormCompsV2/SearchInput";
import { DateTime } from "luxon";
import { setuid } from "process";
import { stringGenerator } from "@/hooks/useStringGenerator";
import TextArea from "@/components/FormCompsV2/TextArea";
import DateMinMax from "../FormCompsV2/DateMinMax";

interface activity_interface {
  value: string;
  display: string;
  disabled: boolean;
}
export function Cage() {
  const [processing, setProcessing] = useState(false);
  const [pig_list, setPigList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [activity, setActivity] = useState<activity_interface[]>([]);
  const [plan_list, setPlanList] = useState<any[]>([]);
  const [usingItem, setUsingItem] = useState<any[]>([]);
  const [useItem, setUseItem] = useState<
    {
      title: string;
      start: Date;
      end?: Date;
      backgroundColor?: string;
      items?: any[];
      activity: string;
      description: string;
      data_time?: string;
      id?: string;
      extendedProps?: any;
    }[]
  >([]);
  const [show, showModal] = useState(false);
  const [item_list, setItems] = useState<any[]>([]);
  const [activity_list, setActivityList] = useState<
    {
      pig_id: string;
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
      display: "",
      description: "",
    },
    criteriaMode: "all",
    mode: "all",
  });
  const { isLoading, isError, data, error, refetch } = useQuery(
    "pig_list",
    async () => {
      const response = await fetch(
        `/api/post/Schedule/Cage/get?keyword=${keyword == "" ? "" : keyword}`
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
      display: "",
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
                  title: `Feeding ${item.item_name} AM`,
                  start: new Date(addedDate),
                  item_id: item.item_id,
                  activity: "1",
                  data_time: "AM",
                  description: "Feeding cage morning",
                },
                {
                  title: `Feeding ${item.item_name} PM`,
                  start: new Date(addedDate),
                  item_id: item.item_id,
                  activity: "1",
                  data_time: "PM",
                  description: "Feeding age afternoon",
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

  const watch_pig_id = watch("pig_id");
  useEffect(() => {
    if (data) {
      if (data.code === 200) {
        if (data.data) {
          setPigList(
            data.data.map((item: any) => ({
              value: item.cage_id,
              display: item.cage_name,
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
    if (keyword == "") {
      refetch();
    }
  }, [keyword]);

  const onSubmit = async () => {
    if (!confirm("Are you sure you want to add this schedule?")) {
      return;
    } else {
      const returned = await CreateCageSchedule(
        activity_list[0].pig_id,
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

  const searchItemWatchKeyword = searchItemWatch("keyword");
  const {
    data: ItemsData,
    error: ItemsError,
    isLoading: ItemsLoading,
    refetch: ItemsRefetch,
  } = useQuery("items", async () => {
    const res = await fetch(
      `/api/get/Schedule/getItems?keyword=${searchItemWatchKeyword}&category=${watchActivity}`
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
  useEffect(() => {
    if (searchItemWatchKeyword == "") {
      ItemsRefetch();
    }
  }, [searchItemWatchKeyword]);
  useEffect(() => {
    ItemsRefetch();
    setValue("item_id", "");
    setValue("item_name", "");
  }, [watchActivity]);
  console.log(useItem);
  return (
    <>
      {" "}
      <input type="checkbox" id="Items" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Add items to scheduled operation
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Item Name*</span>
            </label>
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
          </div>
          <table className="table w-full mt-2">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usingItem.map((item: any, index: any) => (
                <tr key={index}>
                  <td>{item.item_name}</td>
                  <td>
                    <button
                      onClick={() => {
                        setUsingItem(
                          usingItem.filter(
                            (x: any) => x.item_id != item.item_id
                          )
                        );
                      }}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <label htmlFor="Items" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
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
                  </tr>
                </thead>
                <tbody>
                  {item_list.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        <label
                          onClick={() => {
                            setUsingItem([...usingItem, item]);
                            showModal(false);
                            searchItemReset();
                          }}
                          className="link underline hover:text-primary"
                        >
                          {item.item_name}
                        </label>
                      </td>

                      <td>
                        {" "}
                        <label
                          onClick={() => {
                            setUsingItem([...usingItem, item]);
                            showModal(false);
                            searchItemReset();
                          }}
                          className="link underline hover:text-primary"
                        >
                          {item.item_description}
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
            Search the cage you want to add schedule
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
                    <th>Cage Name</th>
                  </tr>
                </thead>
                <tbody>
                  {pig_list.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        <label
                          onClick={() => {
                            if (watchScheduleType == "1") {
                              setValue("pig_id", item.value, {
                                shouldValidate: true,
                              });
                              setValue("display", item.display, {
                                shouldValidate: true,
                              });
                            } else {
                              setValuePlan("pig_id", item.value, {
                                shouldValidate: true,
                              });
                              setValuePlan("display", item.display, {
                                shouldValidate: true,
                              });
                            }
                          }}
                          htmlFor="my-modal-6"
                          className="link underline hover:text-primary"
                        >
                          {item.display}
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
      <div className="flex w-full h-auto py-2 flex-col">
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
      <div className="flex flex-col gap-2 lg:flex-row w-full">
        {watchScheduleType == "1" ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="flex w-1/4 h-auto py-2 flex-col"
          >
            <div className="w-11/12  grid grid-row-3">
              <div className="flex flex-col">
                <label htmlFor="my-modal-6" className={`btn my-aut`}>
                  Choose Cage
                </label>
                <div className="divider ">OR</div>
                <NormalInput
                  label={"Cage"}
                  name={"display"}
                  register={register}
                  errors={errors}
                  validationSchema={{
                    required: "Cage is required",
                  }}
                  required={true}
                  readonly={true}
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
              />
              <TextArea
                label="Description"
                name="description"
                errors={errors}
                validationSchema={{
                  required: "Description is required",
                  maxLength: {
                    value: 100,
                    message: "Description should be less than 100 characters",
                  },
                }}
                register={register}
                required={true}
              ></TextArea>
              <DateMinMax
                label={"Activty Date"}
                name={"operation_date"}
                register={register}
                errors={errors}
                validationSchema={{
                  required: "Date is required",
                  min: {
                    value: new Date(),
                    message: "Date must be greater than today",
                  },
                }}
                type={"date"}
                required={true}
                min={DateTime.now().toISODate()}
                max={DateTime.now().plus({ months: 6 }).toISODate()}
              />
              <label htmlFor="Items" className="btn mt-2 mb-2">
                Add Items
              </label>
            </div>
            <div className="card-actions mt-4">
              <button
                className={`btn btn-active btn-info  mx-4 my-4 ${
                  processing ? "loading" : ""
                }`}
                type={"button"}
                onClick={async () => {
                  const result = await trigger([
                    "display",
                    "operation_date",
                    "pig_id",
                    "activity",
                  ]);
                  if (!result) {
                    toast.warning("Check form inputs for errors");
                    return false;
                  }
                  if (usingItem.length !== 0) {
                    setActivityList([
                      {
                        pig_id: watch("pig_id"),
                      },
                    ]);
                    if (watchActivity == "1") {
                      setUseItem([
                        ...useItem,
                        {
                          title: `${watch("description")} AM`,
                          start: new Date(watchOperationDate),
                          items: usingItem,
                          activity: watchActivity,
                          data_time: "AM",
                          description: watch("description"),
                          id: stringGenerator(),
                        },
                        {
                          title: `${watch("description")} PM`,
                          start: new Date(watchOperationDate),
                          items: usingItem,
                          activity: watchActivity,
                          data_time: "PM",
                          description: watch("description"),
                          id: stringGenerator(),
                        },
                      ]);
                    } else {
                      setUseItem([
                        ...useItem,
                        {
                          title: `${watch("description")}  `,
                          start: new Date(watchOperationDate),
                          items: usingItem,
                          activity: watchActivity,
                          description: watch("description"),
                          data_time: undefined,
                          id: stringGenerator(),
                        },
                      ]);
                    }

                    setUsingItem([]);
                    setValue("activity", "", {
                      shouldValidate: false,
                    });
                    setValue("operation_date", "", {
                      shouldValidate: false,
                    });
                  } else {
                    setUsingItem([]);
                    setValue("activity", "", {
                      shouldValidate: false,
                    });
                    setValue("operation_date", "", {
                      shouldValidate: false,
                    });
                  }
                }}
              >
                Add to list
              </button>
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={() => {
                  onSubmit();
                }}
                type="button"
                className={`btn btn-active btn-success mx-4 ${
                  processing ? "loading" : ""
                }`}
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setUseItem([]);
                }}
                className="btn mx-4"
              >
                Clear
              </button>
            </div>
          </form>
        ) : watchScheduleType == "2" ? (
          <form
            onSubmit={handleSubmitPlan(onSubmit)}
            method="post"
            className="flex w-1/4 h-auto flex-col"
          >
            <div className="w-11/12 grid grid-row-2">
              <div className="flex flex-col">
                <label htmlFor="my-modal-6" className={`btn my-auto`}>
                  Choose Cage
                </label>
                <div className="divider ">OR</div>
                <NormalInput
                  label={"Cage"}
                  name={"display"}
                  register={RegisterPlan}
                  errors={errorsPlan}
                  validationSchema={{
                    required: "Cage is required",
                  }}
                  required={true}
                  readonly={true}
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
                disabled={watchPlan("plan_id") == ""}
              />
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => {
                  console.log(watchPlan("pig_id"));
                  setActivityList([
                    {
                      pig_id: watchPlan("pig_id"),
                    },
                  ]);
                }}
                className={`btn btn-active btn-success mx-4 ${
                  processing ? "loading" : ""
                }`}
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setUseItem([]);
                }}
                className="btn mx-4"
              >
                Reset
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
        <div className="overflow-x-auto w-3/4 mx-auto min-h-screen">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            height={"auto"}
            initialDate={new Date("2023-01-01")}
            initialView="dayGridMonth"
            eventDisplay="block"
            fixedWeekCount={false}
            validRange={{
              start: new Date(),
            }}
            eventClick={(info: any) => {
              if (
                confirm(
                  `Event:${info.event.title} \r\nDo you want to delete this event?`
                )
              ) {
                info.event.remove(info.event.id);
                setUseItem(useItem.filter((item) => item.id != info.event.id));
              }
            }}
            dateClick={(info: any) => {
              if (watchScheduleType == "1") {
                const allowedSelection =
                  DateTime.fromISO(info.dateStr).diffNow("days").days > -1;
                if (allowedSelection) {
                  var days = document.querySelectorAll(".selectedDate");
                  days.forEach(function (day) {
                    day.classList.remove("selectedDate");
                  });
                  info.dayEl.classList.add("selectedDate");
                  setValue("operation_date", info.dateStr, {
                    shouldValidate: true,
                  });
                }
              }
            }}
            dayHeaders={true}
            displayEventTime={false}
            events={useItem}
            unselectAuto={true}
          />
        </div>
      </div>
    </>
  );
}
