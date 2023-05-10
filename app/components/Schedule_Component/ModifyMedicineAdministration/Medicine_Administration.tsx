"use client";
import RightDisplay from "@/components/FormCompsV2/RightDisplay";
import Table from "@/components/TableBody/Table";
import {
  CancelSchedule,
  ConfirmIndividualSchedule,
  UpdateOperationItem,
} from "@/hooks/useSchedule";
import FullCalendar from "@fullcalendar/react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getExtendProps } from "@/hooks/useSched";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SearchInput from "@/components/FormCompsV2/SearchInput";
import { ErrorMessage } from "@hookform/error-message";
import Loading from "@/components/Loading/loading";

interface User {
  user_id: number;
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  job: string;
  is_exist: string;
}

interface ApiData {
  code: number;
  data: User[];
}
export default function ModifyMedicineAdministration() {
  const id = useSearchParams().get("id");
  const [item_list, setItems] = useState<any[]>([]);
  const [displayable, setDisplayable] = useState<any[]>([]);
  const { isLoading, isFetching, data, refetch, error } = useQuery(
    "getModifyOperation",
    async () => {
      const response = await fetch(`/api/get/Operation/getOperations`);
      const data = await response.json();
      return data;
    },
    {}
  );
  const [processing, setProcessing] = useState(false);
  const [parsed, setParsed] = useState<any[]>([]);
  const [colsData, setColsData] = ["username", "name", "job", "phone"];
  const colsName = ["username", "name", "job", "phone"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/user_management/owner";
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");
  const [show, showModal] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitable, getData] = useState<{
    operation_id: string;
    operation_name: string;
    item_name: string;
    item_id: string;
    operation_date: string;
    operation_type: string;
  }>();
  const [prevInfo, setPrevInfo] = useState<any>();
  useEffect(() => {
    setParsed([]);
    if (data) {
      if (data.data) {
        setDisplayable(data.data);
        data.data.map((item: any) => {
          setParsed((prev) => [
            ...prev,
            {
              id: item.operation_id,
              title: `${item.description} `,
              start: item.operation_date,
              backgroundColor:
                item.status == "overdue"
                  ? "red"
                  : item.status == "today"
                  ? "orange"
                  : item.status == "pending"
                  ? "#87CEEB"
                  : item.status == "confirmed"
                  ? "#008000"
                  : "#87CEEB",

              extendedProps: {
                id: item.operation_id,
                date_diff: DateTime.fromISO(item.operation_date).diffNow("days")
                  .days,
                status: item.status,
                operation_id: item.operation_id,
                item_id: item.item_id,
                item_name: item.item_name,
                operation_type: item.operation_type_id,
                operation_date: item.operation_date,
              },
            },
          ]);
        });
      } else {
        setParsed([]);
      }
    }
  }, [data, isFetching]);
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (msg != null) {
      if (status == "success") {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, []);
  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
    setValue: setValue,
    watch,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      operation_id: "",
      operation_date: "",
      operation_type: "",
    },
    criteriaMode: "all",
    mode: "all",
  });

  const {
    data: OperationData,
    isLoading: OperationLoading,
    refetch: OperationDataRefetch,
    isFetching: OperationFetching,
  } = useQuery(
    [
      "OperationData",
      watch("operation_id") !== undefined ? watch("operation_id") : "",
    ],
    async () => {
      const response = await fetch(
        `/api/post/Operation/getOperationDetails/${watch("operation_id")}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {}
  );

  useEffect(() => {
    if (watch("operation_id") !== undefined) {
      OperationDataRefetch();
    }
  }, [watch("operation_id")]);

  useEffect(() => {
    console.log(OperationData);
  }, [OperationData]);

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
  const watchActivity = watch("operation_type");
  const {
    data: ItemsData,
    error: ItemsError,
    isLoading: ItemsLoading,
    refetch: ItemsRefetch,
    isFetching: ItemsFetching,
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
  const onSubmit = async (data: any) => {
    console.log(data);
    const returned = await UpdateOperationItem(
      data.operation_date,
      data.operation_id
    );
    console.log(returned);
    setProcessing(true);
    if (returned.code == 200) {
      setProcessing(false);
      toast.success(returned.message);
      refetch();
      setShowForm(false);
      reset();
    } else {
      setProcessing(false);
      toast.error(returned.message);
    }
  };
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
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-full h-full flex flex-col gap-2  lg:flex-row text-base-content">
          <div className="lg:w-1/2 w-11/12 flex h-auto">
            {watchActivity == "" ? (
              <div className="flex flex-col w-full">
                <div className="alert alert-info shadow-lg w-11/12 mx-auto">
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
                    <span>Select and event in calendar first</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-11/12 mx-auto text-base-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="font-bold text-lg">Move Operation</h3>
                  <div className="flex flex-col">
                    {OperationFetching || OperationLoading ? (
                      <Loading></Loading>
                    ) : (
                      <div>
                        <div>
                          <span className="font-bold text-xl">
                            Operation Description:
                          </span>
                          <span className="text-xl">
                            {
                              displayable.find(
                                (item) =>
                                  item.operation_id == watch("operation_id")
                              ).description
                            }
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xl">
                            Operation Date:
                          </span>
                          <span className="text-xl">
                            {DateTime.fromISO(
                              OperationData?.data.operation[0].operation_date
                            ).toFormat("yyyy-MM-dd HH:mm:ss ")}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xl">Patient:</span>
                          <span className="text-xl">
                            {OperationData?.data.batch_details.length !== 0
                              ? OperationData?.data.batch_details[0].batch_name
                              : ""}
                            {OperationData?.data.cage_details.length !== 0
                              ? OperationData?.data.cage_details[0].cage_name
                              : ""}
                            {OperationData?.data.pig_details.length !== 0
                              ? OperationData?.data.pig_details[0].pig_id
                              : ""}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="w-full flex flex-col">
                      <NormalInput
                        label="Operation Id"
                        name="operation_id"
                        readonly={true}
                        register={register}
                        errors={errors}
                        validationSchema={{
                          required: {
                            value: true,
                            message: "Operation Type is required",
                          },
                        }}
                      />
                      <NormalInput
                        type="datetime-local"
                        name="operation_date"
                        register={register}
                        errors={errors}
                        label="Operation Date and Time"
                        validationSchema={{
                          required: "Operation time is required",
                          min: {
                            value:
                              DateTime.now().toFormat("yyyy-MM-dd ") + "07:30",
                            message:
                              "Minimium time is during working hour which is 7:30 AM",
                          },
                          max: {
                            value:
                              DateTime.now()
                                .plus({ months: 6 })
                                .toFormat("yyyy-MM-dd ") + "21:00",
                            message:
                              "Maximium time is during working hours which is 9:00 PM",
                          },
                        }}
                      ></NormalInput>
                    </div>
                  </div>
                  <div className=" flex flex-col mt-4 ">
                    <button
                      className={`btn btn-warning my-2 ${
                        processing ? "loading" : ""
                      } `}
                    >
                      Move Schedule
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const operation_id = watch("operation_id");
                        const returned = await CancelSchedule(operation_id);
                        setCancel(true);
                        if (returned.code == 200) {
                          setCancel(false);
                          toast.success(returned.message);
                          reset();
                          refetch();
                        } else {
                          setCancel(false);
                          toast.error(returned.message);
                        }
                      }}
                      className={`btn btn-error my-2  ${
                        cancel ? "loading" : ""
                      }`}
                    >
                      Cancel Schedule
                    </button>
                    <button
                      type="button"
                      className={"btn  my-2"}
                      onClick={() => {
                        setShowForm(false);
                        reset();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="lg:w-3/4 w-11/12 flex h-full min-h-screen">
            <div className="w-11/12 mx-auto h-3/4">
              <div className="flex lg:flex-row flex-col gap-2">
                <span className="text-md font-bold font-mono">Legends:</span>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md done mx-2"></div>
                  <span className="text-sm">Done</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md past-due mx-2 my-auto"></div>
                  <span className="text-sm">Past Due</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md pending mx-2 my-auto"></div>
                  <span className="text-sm ">Pending</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md canceled mx-2 my-auto"></div>
                  <span className="text-sm ">Canceled</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md active-selected mx-2 my-auto"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md today mx-2 my-auto"></div>
                  <span className="text-sm ">Today</span>
                </div>
              </div>
              <div className="w-full min-h-screen h-3/4">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialDate={new Date()}
                  height={"auto"}
                  initialView="dayGridMonth"
                  fixedWeekCount={true}
                  eventClick={(info: any) => {
                    const data = getExtendProps(info);
                    if (data.status != "today") {
                      toast.error(
                        "Cannot edit past due ,future ,or already been confirmed operation."
                      );
                      return;
                    }

                    if (prevInfo == null) {
                      setPrevInfo({
                        prevColor: info.el.style.backgroundColor,
                        info: info,
                      });
                      data.date_diff < 0 ? console.log(data) : console.log("");
                      info.el.style.backgroundColor = "#9400D3";
                    } else {
                      if (prevInfo.info.event.id != info.event.id) {
                        setPrevInfo({
                          prevColor: info.el.style.backgroundColor,
                          info: info,
                        });
                      }
                      prevInfo.info.el.style.backgroundColor =
                        prevInfo.prevColor;
                      data.date_diff < 0 ? console.log(data) : console.log("");
                      info.el.style.backgroundColor = "#9400D3";
                    }
                    console.log(data.operation_id);
                    setValue("operation_id", data.operation_id);
                    setValue("operation_type", data.operation_type);
                    setValue("operation_date", data.operation_date);
                  }}
                  dayHeaders={true}
                  events={parsed}
                  eventDisplay="block"
                  dayMaxEvents={true}
                  displayEventTime={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function UpdateCage(item_id: any, operation_id: any) {
  throw new Error("Function not implemented.");
}
