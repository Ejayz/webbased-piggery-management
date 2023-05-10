"use client";

import { processFinisher } from "@/hooks/usePlan";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import uniqolor from "uniqolor";
import NormalInput from "../FormCompsV2/NormalInput";
import SearchInput from "../FormCompsV2/SearchInput";

export default function farrowing() {
  let day = 0;
  let legends: any = [];
  const [finalLegends, setFinalLegends] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [item_list, setItems] = useState<any[]>([]);
  const [show, showModal] = useState(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      item_id: "",
      from_day: "",
      to_day: "",
      item_name: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });

  const [range, setRange] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });

  const { data, error, isLoading, refetch, isFetching } = useQuery(
    "finisher",
    async () => {
      const res = await fetch("/api/post/Plans/getFinisher");
      const data = await res.json();
      return data;
    }
  );

  useEffect(() => {
    async function Exec() {
      if (data) {
        if (data.code == 200) {
          setPlans(data.data);
          data.data.map((plan: any) => {
            if (legends.length !== 0) {
              legends.map((legend: any) => {
                if (legend != plan.item_id) {
                  legends.push(plan.item_id);
                }
              });
            } else {
              legends.push(plan.item_id);
            }
          });
        }
      }
      let uniqueChars = legends.filter((c: any, index: number) => {
        return legends.indexOf(c) === index;
      });
      legends = uniqueChars.map((legend: any) => {
        return {
          id: legend,
          color: uniqolor.random({
            saturation: 80,
            lightness: [70, 80],
          }).color,
        };
      });
      setFinalLegends(legends);
    }

    Exec();
  }, [data]);
  console.log(setFinalLegends);
  const watchDay = watch("from_day");
  const watchTo = watch("to_day");

  useEffect(() => {
    if (watchDay !== "") {
      setRange({
        from: watchDay,
        to: range.to,
      });
    }
  }, [watchDay]);

  useEffect(() => {
    if (watchDay !== "") {
      setRange({
        from: range.from,
        to: watchTo,
      });
    }
  }, [watchTo]);

  const searchItemWatchKeyword = searchItemWatch("keyword");

  const {
    data: ItemsData,
    error: ItemsError,
    isLoading: ItemsLoading,
    refetch: ItemsRefetch,
  } = useQuery("items", async () => {
    const res = await fetch(
      `/api/get/Plans/getFeedingItems?keyword=${searchItemWatchKeyword}`
    );
    const data = await res.json();
    console.log(data);
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

  const onsubmit = async (data: any) => {
    const returned = await processFinisher(
      data.from_day,
      data.to_day,
      data.item_id
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      refetch();
      reset();
      setRange({
        from: "",
        to: "",
      });
    } else {
      toast.error(returned.message);
    }
  };

  return (
    <div className="w-full text-base-content">
      <input
        type="checkbox"
        checked={show}
        readOnly={true}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => showModal(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Find feeds for DAY {watchDay} of farrowing
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
                        <label
                          onClick={() => {
                            setValue("item_id", item.item_id);
                            setValue("item_name", item.item_name);
                            showModal(false);
                          }}
                          htmlFor="my-modal-6"
                          className="link underline hover:text-primary"
                        >
                          {item.item_name}
                        </label>
                      </td>
                      <td>
                        <label
                          onClick={() => {
                            setValue("item_id", item.item_id);
                            setValue("item_name", item.item_name);
                            showModal(false);
                          }}
                          htmlFor="my-modal-6"
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
      <div className="ml-auto lg:mr-4 mr-auto w-1/2">
        <p className="text-xl font-bold">Legends</p>
        <div className="grid grid-cols-4">
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-info mr-2"></div>
            <span className="my-auto"> Created</span>
          </div>
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-success mr-2"></div>
            <span className="my-auto"> Selected</span>
          </div>
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-base-300 mr-2"></div>
            <span className="my-auto"> Empty</span>
          </div>
          {finalLegends.length == 0 ? (
            <></>
          ) : (
            finalLegends.map((legend: any, index: number) => {
              return (
                <div key={index} className="flex flex-row my-2 mx-2">
                  <div
                    style={{ backgroundColor: legend.color }}
                    className="h-4 my-auto w-4 rounded-md  mr-2"
                  ></div>
                  <span className="my-auto">
                    {plans.length == 0
                      ? ""
                      : plans[
                          plans.findIndex(
                            (item: any) => item.item_id == legend.id
                          )
                        ].item_name}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="w-full h-auto mx-auto gap-x-4 lg:grid grid-cols-0 flex flex-col lg:grid-cols-3">
        <div className="col-span-1">
          <p className="text-xl font-bold">Update Finisher</p>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-11/12 mx-auto">
              <NormalInput
                label="From Day"
                type="text"
                register={register}
                name="from_day"
                errors={errors}
                validationSchema={{
                  required: "Day is required",
                  min: {
                    value: 1,
                    message: "Day must be greater than 0",
                  },
                  max: {
                    value: 56,
                    message: "Day must be less than 56",
                  },
                  validate: {
                    isReal: (value: any) =>
                      value > parseInt(watchTo)
                        ? "Day must be less than To Day"
                        : true,
                  },
                }}
                required={true}
                disabled={watchDay == ""}
              />{" "}
              <NormalInput
                label="To Day"
                type="text"
                register={register}
                name="to_day"
                errors={errors}
                validationSchema={{
                  required: "Day is required",
                  min: {
                    value: 1,
                    message: "Day must be greater than 0",
                  },
                  max: {
                    value: 56,
                    message: "Day must be less than 56",
                  },
                  validate: {
                    isReal: (value: any) =>
                      value < parseInt(watchDay)
                        ? "Day must be greater than From Day"
                        : true,
                  },
                }}
                required={true}
                disabled={watchDay == ""}
              />{" "}
              <SearchInput
                label="Selected Item"
                type="text"
                register={register}
                name="item_name"
                errors={errors}
                validationSchema={{
                  required: "Day is required",
                }}
                required={true}
                readonly={watchDay == ""}
                showModal={showModal}
              />
            </div>
            <div className="justify-center flex mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={range.from == "" || range.to == ""}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  reset();
                  setRange({ from: "", to: "" });
                }}
                type="button"
                className="btn btn-success  mx-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="w-full  col-span-2">
          {isFetching ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <table className=" table table-fixed lg:w-11/12 w-full text-center mt-4 lg:mt-0">
              <thead className="">
                <tr>
                  <th className="text-xl uppercase" colSpan={1}>
                    Weeks
                  </th>
                  <th className="text-xl uppercase" colSpan={7}>
                    Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {new Array(8).fill(null).map((data, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="font-normal lg:font-bold w-24 text-sm lg:text-xl">
                        <div className="lg:mx-auto my-auto ml-auto mr-0 flex flex-col p-2">
                          <span className="mx-auto">WEEK </span>
                          <span className="mx-auto">{index + 1}</span>
                        </div>
                      </td>
                      {new Array(7).fill(null).map((index: number) => {
                        day++;
                        const days = day;
                        console.log(
                          plans[days - 1]?.day == days &&
                            parseInt(watchDay) != days
                        );
                        return (
                          <td
                            onClick={() => {
                              if (
                                parseInt(range.from) == days &&
                                range.to == ""
                              ) {
                                setValue("to_day", `${days}`, {
                                  shouldValidate: true,
                                });
                                setRange({ from: range.from, to: `${days}` });
                              } else if (
                                parseInt(range.from) == days &&
                                range.to == ""
                              ) {
                                setValue("to_day", ``, {
                                  shouldValidate: false,
                                });
                                setValue("from_day", ``, {
                                  shouldValidate: false,
                                });
                                setValue("item_name", "", {
                                  shouldValidate: false,
                                });
                                setRange({ from: "", to: "" });
                              } else if (range.from == "" || range.to == "") {
                                if (
                                  range.from !== "" &&
                                  days < parseInt(range.from)
                                ) {
                                  toast.error(
                                    "Invalid Range.Pick a day greater than from day"
                                  );
                                } else if (range.from == "" && range.to == "") {
                                  if (plans[days - 1]?.day == days) {
                                    setValue("from_day", plans[days - 1]?.day, {
                                      shouldValidate: false,
                                    });
                                    setValue(
                                      "item_id",
                                      plans[days - 1]?.item_id,
                                      {
                                        shouldValidate: false,
                                      }
                                    );
                                    setValue(
                                      "item_name",
                                      plans[days - 1]?.item_name,
                                      {
                                        shouldValidate: false,
                                      }
                                    );
                                  } else {
                                    setValue("from_day", `${days}`, {
                                      shouldValidate: false,
                                    });
                                    setValue("item_id", ""),
                                      {
                                        shouldValidate: false,
                                      };
                                    setValue("item_name", "", {
                                      shouldValidate: false,
                                    });
                                  }
                                  setRange({ from: `${days}`, to: "" });
                                } else {
                                  if (plans[days - 1]?.day == days) {
                                    setValue("to_day", plans[days - 1]?.day, {
                                      shouldValidate: false,
                                    });
                                    setValue(
                                      "item_id",
                                      plans[days - 1]?.item_id
                                    ),
                                      {
                                        shouldValidate: false,
                                      };
                                    setValue(
                                      "item_name",
                                      plans[days - 1]?.item_name,
                                      {
                                        shouldValidate: false,
                                      }
                                    );
                                  } else {
                                    setValue("to_day", `${days}`, {
                                      shouldValidate: false,
                                    });
                                    setValue("item_id", "", {
                                      shouldValidate: false,
                                    });
                                    setValue("item_name", "", {
                                      shouldValidate: false,
                                    });
                                  }
                                  setRange({ from: range.from, to: `${days}` });
                                }
                              } else if (parseInt(range.to) == days) {
                                setValue("to_day", ``, {
                                  shouldValidate: false,
                                });
                                setValue("item_id", "", {
                                  shouldValidate: false,
                                });
                                setValue("item_name", "", {
                                  shouldValidate: false,
                                });
                                setRange({ from: range.from, to: `` });
                              } else if (range.from != "" && range.to != "") {
                                setValue("to_day", ``, {
                                  shouldValidate: false,
                                });
                                setValue("from_day", ``, {
                                  shouldValidate: false,
                                });
                                setValue("item_name", "", {
                                  shouldValidate: false,
                                });
                                setRange({ from: "", to: "" });
                              }
                            }}
                            key={day}
                            style={{
                              backgroundColor:
                                days >= parseInt(range.from) &&
                                days <= parseInt(range.to)
                                  ? "#36D399"
                                  : plans[days - 1]?.day == days &&
                                    parseInt(watchDay) != days
                                  ? finalLegends[
                                      finalLegends.findIndex(
                                        (legend: any) =>
                                          legend.id == plans[days - 1]?.item_id
                                      )
                                    ].color
                                  : days == parseInt(range.from)
                                  ? "#36D399"
                                  : days == parseInt(range.to)
                                  ? "#36D399"
                                  : "#FFFFFF",
                            }}
                            className={`text-center relative cursor-pointer `}
                          >
                            {" "}
                            <div
                              data-tip={
                                plans[day - 1]?.day == day
                                  ? `Using ${
                                      plans[day - 1]?.item_name
                                    } on this day`
                                  : "This day is empty"
                              }
                              className={` flex flex-row  tooltip  `}
                            >
                              <p className="mx-auto my-auto font-normal text-sm lg:text-xl lg:font-bold">
                                Day {day}
                              </p>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
