"use client";
import RightDisplay from "@/components/FormCompsV2/RightDisplay";
import Table from "@/components/TableBody/Table";
import { ConfirmIndividualSchedule } from "@/hooks/useSchedule";
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
export default function FeedingActivity() {
  const id = useSearchParams().get("id");

  const { isLoading, isFetching, data, refetch, error } = useQuery(
    "userData",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Operation/getIndividualCheckList/getCheckListFeeding/?batch_id=${id}`
      );
      const data = await response.json();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [filter, setFilter] = useState({
    sortby: "operation_date",
    sortorder: "desc",
    keyword: "",
  });
  const [parsed, setParsed] = useState<any[]>([]);
  const [colsData, setColsData] = ["username", "name", "job", "phone"];
  const colsName = ["username", "name", "job", "phone"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/user_management/owner";
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");

  const [showForm, setShowForm] = useState(false);
  const [submitable, getData] = useState<{
    item_id: string;
    item_quantity: string;
    batch_id: string;
    operation_id: string;
    item_unit: string;
  }>();
  const [prevInfo, setPrevInfo] = useState<any>();
  useEffect(() => {
    if (data) {
      if (data.data) {
        setParsed([]);
        data.data.map((item: any) => {
          setParsed((prev) => [
            ...prev,
            {
              id: item.operation_id,
              title: `${item.operation_name} ${item.item_name} ${item.am_pm} `,
              start: item.operation_date,
              backgroundColor:
                DateTime.fromISO(item.operation_date).diffNow("days").days <
                  -1 &&
                (item.status == "pending" || item.status == "confirmed")
                  ? "red"
                  : DateTime.fromISO(item.operation_date).diffNow("days").days <
                      0 &&
                    (item.status == "pending" || item.status != "confirmed")
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
    if (filter.keyword == "") {
      refetch();
    }
  }, [filter.keyword]);

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
  } = useForm({
    defaultValues: {
      item_quantity: "",
    },
    criteriaMode: "all",
    mode: "all",
  });
  const onSubmit = (data: any) => {};

  const watchQuantity = watch("item_quantity");

  const {
    data: OperationData,
    isLoading: OperationLoading,
    refetch: OperationDataRefetch,
  } = useQuery(
    [
      "OperationData",
      submitable?.operation_id !== undefined ? submitable?.operation_id : "",
    ],
    async () => {
      const response = await fetch(
        `/api/post/Operation/getOperationDetails/${submitable?.operation_id}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (submitable?.operation_id !== undefined) {
      OperationDataRefetch();
    }
  }, [submitable?.operation_id]);
  const [OpData, setOperationData] = useState<any[]>([]);
  useEffect(() => {
    setOperationData([]);
    if (OperationData) {
      if (OperationData.data) {
        console.log(OperationData.data);
        OperationData.data.map((item: any) => {
          setOperationData([
            ...OpData,
            {
              operation_details_id: item.operation_details_id,
              operation_id: item.operation_id,
              item_id: item.item_id,
              item_name: item.item_name,
              quantity: "",
              totalStocks: item.closing_quantity,
              item_net_weight_unit: item.item_net_weight_unit,
            },
          ]);
        });
      }
    }
  }, [OperationData]);
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-full h-full flex flex-row text-base-content">
          <div className="w-1/4 flex h-auto">
            {OperationData == undefined ? (
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
                <h3 className="font-bold text-lg">Confirm Operation</h3>
                <div className="flex flex-col">
                  <div className="w-full flex flex-row">
                    <span className="text-md font-bold font-mono w-5/12">
                      Operation Date:
                    </span>
                    <span>
                      {DateTime.fromISO(OperationData?.data[0].operation_date)
                        .setZone("Asia/Manila")
                        .toFormat("EEEE',' MMM d',' yyyy")}
                    </span>
                  </div>
                  <div className="w-full flex flex-row">
                    <span className="text-md font-bold font-mono w-5/12">
                      Operation Type:
                    </span>
                    <span>{OperationData?.data[0].operation_name}</span>
                  </div>
                  <div className="w-full flex flex-row">
                    <span className="text-md font-bold font-mono w-5/12">
                      Operation Time:
                    </span>
                    <span>{OperationData?.data[0].am_pm}</span>
                  </div>
                  {OpData.length < 0 ? (
                    <></>
                  ) : (
                    OpData.map((item: any, key: number) => {
                      return (
                        <>
                          <div className="w-full flex flex-row">
                            <span className="text-md font-bold font-mono w-5/12">
                              Item:
                            </span>
                            <span>{item.item_name}</span>
                          </div>
                          <div className="w-full flex flex-row">
                            <span className="text-md font-bold font-mono w-5/12">
                              Stocks:
                            </span>
                            <span>{`${item.totalStocks} ${item.item_net_weight_unit}`}</span>
                          </div>
                          <RightDisplay
                            name="item_quantity"
                            label={"Item Quantity"}
                            type={"number"}
                            register={register}
                            item_unit={item.item_net_weight_unit}
                            required={true}
                            value={item.quantity}
                            setValue={setOperationData}
                            index={key}
                          />
                        </>
                      );
                    })
                  )}
                </div>
                <div className=" justify-end mt-4 ">
                  <button
                    className={"btn btn-primary "}
                    onClick={async () => {
                      let isAllowed = true;
                      OpData.map((item: any) => {
                        if (item.quantity == 0 || item.quantity == "") {
                          isAllowed = false;
                        }
                      });
                      if (isAllowed) {
                        const returned = await ConfirmIndividualSchedule(
                          OpData
                        );
                        if (returned.code == 200) {
                          getData(undefined);
                          setShowForm(false);
                          refetch();
                          setValue("item_quantity", "");
                          toast.success(returned.message);
                          setPrevInfo(undefined);
                        } else {
                          toast.error(returned.message);
                        }
                      }
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className={"btn  "}
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-3/4 flex h-full">
            <div className="w-11/12 mx-auto h-3/4">
              <div className="flex flex-row ">
                <span className="text-md font-bold font-mono">Legends:</span>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md done mx-2"></div>
                  <span className="text-sm">Done</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md past-due mx-2 my-auto"></div>
                  <span className="text-sm mx-auto">Past Due</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md pending mx-2 my-auto"></div>
                  <span className="text-sm mx-auto">Pending</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md canceled mx-2 my-auto"></div>
                  <span className="text-sm mx-auto">Canceled</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md active-selected mx-2 my-auto"></div>
                  <span className="text-sm mx-auto">Selected</span>
                </div>
                <div className="flex flex-row">
                  <div className="h-4 w-4 rounded-md today mx-2 my-auto"></div>
                  <span className="text-sm mx-auto">Today</span>
                </div>
              </div>
              {isFetching || isLoading ? (
                <Loading></Loading>
              ) : (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialDate={new Date()}
                  initialView="dayGridMonth"
                  fixedWeekCount={true}
                  eventClick={(info: any) => {
                    const data = getExtendProps(info);
                    if (data.date_diff < -1) {
                      toast.error("Cannot edit past due operation");
                      return;
                    }
                    if (data.date_diff > 0) {
                      toast.error("Cannot edit future pending operation");
                      return;
                    }
                    if (data.status != "pending") {
                      toast.error(
                        "Interaction with confirmed operation is not permitted."
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
                    getData({
                      item_id: "",
                      item_quantity: "",
                      batch_id: "",
                      operation_id: data.id,
                      item_unit: "",
                    });
                  }}
                  dayHeaders={true}
                  events={parsed}
                  eventDisplay="block"
                  dayMaxEvents={true}
                  displayEventTime={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
