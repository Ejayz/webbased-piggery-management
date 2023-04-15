"use client";

import { processWeaner } from "@/hooks/usePlan";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NormalInput from "../FormCompsV2/NormalInput";
import SearchInput from "../FormCompsV2/SearchInput";

export default function farrowing() {
  let day = 0;
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
      day: "",
      item_name: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  const { data, error, isLoading, refetch, isFetching } = useQuery(
    "farrowing",
    async () => {
      const res = await fetch("/api/post/Plans/getWeaner");
      const data = await res.json();
      return data;
    }
  );

  useEffect(() => {
    if (data) {
      if (data.code == 200) {
        setPlans(data.data);
      }
    }
  }, [data]);
  const watchDay = watch("day");

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
    const returned = await processWeaner(data.day, data.item_id);
    if (returned.code == 200) {
      toast.success(returned.message);
      refetch();
      reset();
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
                            setValue("item_id", item.item_id);
                            setValue("item_name", item.item_name);
                            showModal(false);
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
      <div className="ml-auto mr-4 w-1/2">
        <p className="text-xl font-bold">Legends</p>
        <div className="flex flex-row">
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-info mr-2"></div>
            <span className="my-auto"> Already had set an item.</span>
          </div>
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-success mr-2"></div>
            <span className="my-auto"> To be updated </span>
          </div>
          <div className="flex flex-row my-2 mx-2">
            <div className="h-4 my-auto w-4 rounded-md bg-base-300 mr-2"></div>
            <span className="my-auto"> No item set.</span>
          </div>
        </div>
      </div>
      <div className="w-11/12 h-auto mx-auto gap-x-4 grid grid-cols-3">
        <div className="col-span-1">
          <p className="text-xl font-bold">Update Weaner</p>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="w-11/12 mx-auto">
              <NormalInput
                label="Day"
                type="text"
                register={register}
                name="day"
                errors={errors}
                validationSchema={{
                  required: "Day is required",
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
                disabled={watchDay == ""}
              >
                Submit
              </button>
              <button
                onClick={() => reset()}
                type="button"
                className="btn  mx-2"
                disabled={watchDay == ""}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="w-11/12  col-span-2">
          {isFetching ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <table className=" table w-11/12 text-center">
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
                      <td className="font-bold">
                        <div className="mx-auto my-auto flex flex-col p-2">
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
                              if (plans[days - 1]?.day == days) {
                                setValue("day", plans[days - 1]?.day);
                                setValue("item_id", plans[days - 1]?.item_id);
                                setValue(
                                  "item_name",
                                  plans[days - 1]?.item_name
                                );
                              } else {
                                setValue("day", `${days}`);
                                setValue("item_id", "");
                                setValue("item_name", "");
                              }
                            }}
                            key={day}
                            className={` text-center  w-26  cursor-pointer group ${
                              parseInt(watchDay) == days
                                ? " bg-success "
                                : plans[days - 1]?.day == days &&
                                  parseInt(watchDay) != days
                                ? " bg-info "
                                : " bg-base-300 "
                            }`}
                          >
                            <div className={`flex flex-col w-26 h-auto  `}>
                              <p className="mx-auto my-auto font-bold">
                                Day {day}
                              </p>
                              <p
                                className={`text-sm hidden   break-words ${
                                  plans[day - 1]?.day == day
                                    ? "group-hover:block"
                                    : "hidden"
                                }`}
                              >
                                Using
                                <span className="font-bold ">
                                  {` ${plans[day - 1]?.item_name} `}
                                </span>
                                on this day
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
