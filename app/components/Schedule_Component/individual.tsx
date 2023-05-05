"use client";

import { CreateIndividualSchedule } from "@/hooks/useSchedule";
import FullCalendar from "@fullcalendar/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NormalInput from "../FormCompsV2/NormalInput";
import SelectInput from "../FormCompsV2/SelectInput";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SearchInput from "../FormCompsV2/SearchInput";
import { DateTime } from "luxon";
import QrCode from "../QrComponent/qrcode";
import { stringGenerator } from "@/hooks/useStringGenerator";
import Textarea from "@/components/FormCompsV2/TextArea";
import DateMinMax from "../FormCompsV2/DateMinMax";

interface activity_interface {
  value: string;
  display: string;
  disabled: boolean;
}
export function Individual() {
  const [processing, setProcessing] = useState(false);
  const [pig_list, setPigList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [activity, setActivity] = useState<activity_interface[]>([]);
  const [usingItem, setUsingItem] = useState<any[]>([]);
  const [plan_list, setPlanList] = useState<any[]>([]);
  const [hideScanner, setHideScanner] = useState(false);
  const [useItem, setUseItem] = useState<
    {
      title: string;
      start: Date;
      end?: Date;
      backgroundColor?: string;
      item_id?: string;
      description: string;
      items?: any[];
      activity: string;
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

      operation_date: "",
      schedule_option: "1",
      description: "",
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
                  title: `Feeding ${item.item_name} AM`,
                  start: new Date(addedDate),
                  item_id: item.item_id,
                  activity: "1",
                  description: "Feeding pigs in the morning",
                  data_time: "AM",
                },
                {
                  title: `Feeding ${item.item_name} PM`,
                  start: new Date(addedDate),
                  item_id: item.item_id,
                  activity: "1",
                  description: "Feeding pigs in the afternoon",
                  data_time: "PM",
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

  const watchActivity = watch("activity");

  const watch_pig_id = watch("pig_id");
  useEffect(() => {
    if (data) {
      if (data.code === 200) {
        if (data.data) {
          setPigList(
            data.data.map((item: any) => ({
              batch: item.batch_name,
              cage: item.cage_name,
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
    if (keyword == "") {
      refetch();
    }
  }, [keyword]);

  const onSubmit = async () => {
    if (!confirm("Are you sure you want to add this schedule?")) {
      return;
    } else {
      const returned = await CreateIndividualSchedule(
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
  }, [watchActivity]);
  console.log(useItem);
  return (
    <>
      <input type="checkbox" id="Items" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
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
        id="my-modal-6"
        checked={hideScanner}
        onChange={() => {
          setHideScanner(!hideScanner);
        }}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-base-content">
            Use custom Qr Code
          </h3>
          <QrCode
            setter={setValue}
            setHide={setHideScanner}
            hide={hideScanner}
            ActionMaker={"pig_id"}
          ></QrCode>
          <div className="modal-action">
            <button
              onClick={() => {
                setHideScanner(false);
              }}
              className="btn"
            >
              Close
            </button>
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
        <div className="modal-box relative w-11/12 max-w-5xl">
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
                  {item_list.map((item, index) => {
                    if (
                      usingItem.find((x) => x.item_id == item.item_id) ==
                      undefined
                    ) {
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            <label
                              onClick={() => {
                                setUsingItem([...usingItem, item]);
                                ItemsRefetch();
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
                                ItemsRefetch();
                                showModal(false);
                                searchItemReset();
                              }}
                              className="link underline hover:text-primary"
                            >
                              {item.item_description}
                            </label>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="search_pig" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="search_pig"
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
                    <th>Batch</th>
                    <th>Cage</th>
                  </tr>
                </thead>
                <tbody>
                  {pig_list.map((item, index) => (
                    <tr key={index}>
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
                          htmlFor="search_pig"
                          className="link underline hover:text-primary"
                        >
                          {item.display}
                        </label>
                      </td>
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
                          htmlFor="search_pig"
                          className="link underline hover:text-primary"
                        >
                          {item.batch}
                        </label>
                      </td>
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
                          htmlFor="search_pig"
                          className="link underline hover:text-primary"
                        >
                          {item.cage}
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
                <label htmlFor="search_pig" className={`btn my-auto`}>
                  Choose Pig
                </label>{" "}
                <div className="divider-horizontal"></div>{" "}
                <button
                  type="button"
                  className={" mt-2 text-primary-content btn"}
                  onClick={() => {
                    setHideScanner(true);
                  }}
                >
                  Scan QR CODE
                </button>
                <div className="divider ">OR</div>
                <NormalInput
                  label={"Enter Pig Id"}
                  name={"pig_id"}
                  register={register}
                  errors={errors}
                  validationSchema={{
                    required: "Pig Id is required",
                  }}
                  required={true}
                  readonly={watch("pig_id") != ""}
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
              <Textarea
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
              ></Textarea>
              <DateMinMax
                label={"Activty Date"}
                name={"operation_date"}
                register={register}
                errors={errors}
                validationSchema={{
                  required: "Date is required",
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
                    "operation_date",
                    "pig_id",
                    "activity",
                  ]);
                  if (!result) {
                    toast.warning("Check form inputs for errors");
                    return false;
                  }
                  const desct = watch("description");
                  if (item_list.length !== 0) {
                    setActivityList([
                      {
                        pig_id: watch("pig_id"),
                      },
                    ]);
                    if (watchActivity == "1") {
                      setUseItem([
                        ...useItem,
                        {
                          title: `${desct}`,
                          start: new Date(watchOperationDate),
                          description: `${desct}`,
                          activity: watchActivity,
                          data_time: "AM",
                          items: usingItem,
                          id: stringGenerator(),
                          extendedProps: {
                            id: useItem.length,
                          },
                        },
                        {
                          title: `${desct}`,
                          start: new Date(watchOperationDate),
                          activity: watchActivity,
                          data_time: "PM",
                          items: usingItem,
                          id: `${stringGenerator()}`,
                          description: `${desct}`,
                          extendedProps: {
                            id: useItem.length + 1,
                          },
                        },
                      ]);
                    } else {
                      setUseItem([
                        ...useItem,
                        {
                          title: `${desct} `,
                          start: new Date(watchOperationDate),
                          activity: watchActivity,
                          data_time: undefined,
                          items: usingItem,
                          description: `${desct}`,
                          id: `${stringGenerator()}`,
                          extendedProps: {
                            id: useItem.length,
                          },
                        },
                      ]);
                    }
                    setUsingItem([]);
                    setValue("activity", "", {
                      shouldValidate: false,
                    });

                    setValue("pig_id", "");
                    setValue("description", "");
                    setValue("operation_date", "", {
                      shouldValidate: false,
                    });
                  } else {
                    setUsingItem([]);
                    setValue("pig_id", "");
                    setValue("description", "");
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
                Reset
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
                <label htmlFor="search_pig" className={`btn my-auto`}>
                  Choose Pig
                </label>
                <button
                  type="button"
                  className={" mt-2 text-primary-content btn"}
                  onClick={() => {
                    setHideScanner(true);
                  }}
                >
                  Scan QR CODE
                </button>
                <div className="divider ">OR</div>
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
                disabled={watchPlan("plan_id") == ""}
              />
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => {
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
                  setUseItem([]);
                  reset();
                }}
                className="btn mx-4"
              >
                Clear
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
        <div className="overflow-x-auto lg:w-3/4 min-h-screen mx-auto w-11/12 h-full">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            height={500}
            initialDate={new Date("2023-01-01")}
            initialView="dayGridMonth"
            eventDisplay="block"
            fixedWeekCount={false}
            validRange={{
              start: new Date(),
              end: `${DateTime.now()
                .plus({ months: 6 })
                .setZone("Asia/Manila")
                .toISODate()}`,
            }}
            eventClick={(info: any) => {
              if (
                confirm(
                  `Event:${info.event.title} \r\nDo you want to delete this event?`
                )
              ) {
                info.event.remove(info.event.id);
                setUseItem(useItem.filter((item) => item.id !== info.event.id));
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
          />
        </div>
      </div>
    </>
  );
}
