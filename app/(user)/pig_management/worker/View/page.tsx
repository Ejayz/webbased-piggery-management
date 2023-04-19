"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, View } from "@/hooks/usePigManagement";
import {
  validateNormal,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/Errors/PageNotFound";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import { useQuery } from "react-query";
import { IdGenerator } from "@/hooks/usePigManagement";
import QrCode from "@/components/QrComponent/qrcode";
import { QRCodeCanvas } from "qrcode.react";
import { DateTime } from "luxon";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
  max?: string;
  current_capacity?: any;
}
interface SelectedCage {
  cage_id: string;
  selected_quantity: number;
}
export default function Page({ params }: any) {
  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [cageSelected, setCageSelected] = useState<SelectedCage[]>([]);
  const id: any = useSearchParams().get("id");
  const [pig_history, setPigHistory] = useState<any[]>([]);
  const [Individual, setIndividual] = useState<any[]>([]);
  const [batch, setBatch] = useState<any[]>([]);
  const [cage, setCage] = useState<any[]>([]);
  const [tabs, setTabs] = useState<any>(0);
  const [page, setPage] = useState<any>(1);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pig_id: "",
      cage_id: "",
      pig_tag: "",
      status: "",
      weight: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { isLoading, error, isFetching, data, refetch } = useQuery(
    "pigDetails",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/getFormDetailAction`
      );
      const date = new Date();
      const epochTime = date.getTime() / 1000;
      const data = await response.json();
      data.time = epochTime;
      return data;
    },
    {}
  );

  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState();

  const [isCageCapacity, setIsCageCapacity] = useState(true);
  const [isCageName, setIsCageName] = useState(true);
  const [isCageType, setIsCageType] = useState(true);

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  let message: any = [];
  const [processing, setProcessing] = useState(false);
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/pig_management/worker/List");
    } else {
      router.push(
        `/pig_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }

  const {
    error: errorView,
    data: dataView,
    isLoading: loadingView,
  } = useQuery("View", async () => {}, {});

  const {
    data: pigData,
    isLoading: pigLoading,
    error: pigError,
    refetch: pigRefetch,
    isFetching: pigIsFetching,
  } = useQuery(
    "pigDatas",
    async () => {
      const response = await fetch(
        `/api/get/PigManagement/getAllPigInfor?pig_id=${id}`
      );
      const returned = await response.json();
      console.log(returned);
      return returned;
    },
    {}
  );
  useEffect(() => {
    pigRefetch();
  }, [page]);

  useEffect(() => {
    if (pigData?.code == 200) {
      if (pigData.data) {
        setPigHistory(pigData.data.pig_history);
        pigData.data.individual.map((item: any) => {
          console.log(item);
          setIndividual((prev) => [
            ...prev,
            {
              id: item.operation_id,
              title: `${item.operation_name} ${item.item_name} ${
                item.am_pm ? "" : ""
              } `,
              start: item.operation_date,
              backgroundColor:
                DateTime.fromISO(item.operation_date).diffNow("days").days <
                  -1 &&
                (item.status == "pending" || item.status != "confirmed")
                  ? "red"
                  : DateTime.fromISO(item.operation_date).diffNow("days").days <
                      0 &&
                    (item.status == "pending" || item.status != "confirmed")
                  ? "orange"
                  : item.status == "pending"
                  ? "#87CEEB"
                  : item.status == "confirmed"
                  ? "#008000"
                  : "red",

              extendedProps: {
                id: item.operation_id,
                date_diff: DateTime.fromISO(item.operation_date).diffNow("days")
                  .days,
                status: item.status,
              },
            },
          ]);
        });
        pigData.data.batch.map((item: any) => {
          setBatch((prev) => [
            ...prev,
            {
              id: item.operation_id,
              title: `${item.operation_name} ${item.item_name} ${
                item.am_pm ? "" : ""
              } `,
              start: item.operation_date,
              backgroundColor:
                DateTime.fromISO(item.operation_date).diffNow("days").days <
                  -1 &&
                (item.status == "pending" || item.status != "confirmed")
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
        pigData.data.cage.map((item: any) => {
          setCage((prev) => [
            ...prev,
            {
              id: item.operation_id,
              title: `${item.operation_name} ${item.item_name} ${
                item.am_pm ? "" : ""
              } `,
              start: item.operation_date,
              backgroundColor:
                DateTime.fromISO(item.operation_date).diffNow("days").days <
                  -1 &&
                (item.status == "pending" || item.status != "confirmed")
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
      }
    }
  }, [pigData]);

  useEffect(() => {
    if (id !== null || id !== undefined) {
      pigRefetch();
    }
  }, []);

  if (pigIsFetching && isLoading) {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">Manage Pig</p>
          </div>
        </div>
        <div className=" mx-auto text-base-content w-11/12">
          <div className="">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>Pig Management</li>
                <li>View</li>
              </ul>
            </div>
            <div>
              <div className="w-full h-auto flex flex-col">
                <div>
                  <div className="">
                    <QRCodeCanvas
                      id="canvasable"
                      className="p-4 "
                      width={48}
                      height={48}
                      value={id}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="p-4 text-2xl font-bold font-mono">
                        Pig Id:
                      </span>
                      <span className="text-xl ">
                        {pig_history.length != 0 ? pig_history[0]?.pig_id : ""}
                      </span>
                    </div>
                    <div>
                      <span className="p-4 text-2xl font-bold font-mono">
                        Batch Name:
                      </span>
                      <span className="text-xl ">
                        {pig_history.length != 0
                          ? pig_history[0]?.batch_name
                          : ""}
                      </span>
                    </div>
                    <div>
                      <span className="p-4 text-2xl font-bold font-mono">
                        Birth Date:
                      </span>
                      <span className="text-xl ">
                        {pig_history.length != 0
                          ? DateTime.fromISO(pig_history[0]?.birthdate)
                              .setZone("Asia/Manila")
                              .toFormat("EEEE',' MMM d',' yyyy")
                          : ""}
                      </span>
                    </div>
                    <div>
                      <span className="p-4 text-2xl font-bold font-mono">
                        Age:
                      </span>
                      <span className="text-xl ">
                        {`${Math.ceil(
                          DateTime.now().diff(
                            DateTime.fromISO(
                              pig_history.length != 0
                                ? pig_history[0]?.birthdate
                                : ""
                            ),
                            "days"
                          ).days
                        )} Days Old`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full min-h-screen  ">
                  <div className="tabs tab-lg mt-4 mb-4">
                    <button
                      onClick={() => {
                        setTabs(0);
                      }}
                      className={`tab tab-bordered ${
                        tabs == 0 ? "tab-active" : ""
                      }`}
                    >
                      History
                    </button>
                    <button
                      onClick={() => {
                        setTabs(1);
                      }}
                      className={`tab tab-bordered ${
                        tabs == 1 ? "tab-active" : ""
                      }`}
                    >
                      Individual
                    </button>
                    <button
                      onClick={() => {
                        setTabs(2);
                      }}
                      className={`tab tab-bordered ${
                        tabs == 2 ? "tab-active" : ""
                      }`}
                    >
                      Cage
                    </button>
                    <button
                      onClick={() => {
                        setTabs(3);
                      }}
                      className={`tab tab-bordered ${
                        tabs == 3 ? "tab-active" : ""
                      }`}
                    >
                      Batch
                    </button>
                  </div>
                  {tabs == 0 ? (
                    <div className="w-full h-auto">
                      <div className="overflow-x-auto">
                        <table className="table table-compact w-full overflow-y-scroll">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Cage Name</th>
                              <th>Pig Tag</th>
                              <th>Weight</th>
                              <th>Remarks</th>
                              <th>History Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pig_history.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {item.cage_name}
                                  </td>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {item.pig_id}
                                  </td>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {item.weight}
                                  </td>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {item.remarks}
                                  </td>
                                  <td
                                    className={`${
                                      item.pig_history_status == "active"
                                        ? "bg-success"
                                        : ""
                                    }`}
                                  >
                                    {item.pig_history_status}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : tabs == 1 ? (
                    <>
                      <div className="w-11/12 mx-auto h-3/4">
                        <div className="flex flex-row ">
                          <span className="text-md font-bold font-mono">
                            Legends:
                          </span>
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
                      </div>
                      <div className="h-1/2  w-full pb-12">
                        <FullCalendar
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialDate={new Date()}
                          initialView="dayGridMonth"
                          fixedWeekCount={true}
                          dayHeaders={true}
                          events={Individual}
                          eventDisplay="block"
                          dayMaxEvents={true}
                          displayEventTime={false}
                        />
                      </div>
                    </>
                  ) : tabs == 2 ? (
                    <>
                      <div className="w-11/12 mx-auto h-3/4">
                        <div className="flex flex-row ">
                          <span className="text-md font-bold font-mono">
                            Legends:
                          </span>
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
                      </div>
                      <div className="h-1/2  w-full pb-12">
                        <FullCalendar
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialDate={new Date()}
                          initialView="dayGridMonth"
                          fixedWeekCount={true}
                          dayHeaders={true}
                          events={cage}
                          eventDisplay="block"
                          dayMaxEvents={true}
                          displayEventTime={false}
                        />
                      </div>
                    </>
                  ) : tabs == 3 ? (
                    <>
                      <div className="w-11/12 mx-auto h-3/4">
                        <div className="flex flex-row ">
                          <span className="text-md font-bold font-mono">
                            Legends:
                          </span>
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
                        <div className="h-1/2  w-full pb-12">
                          <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialDate={new Date()}
                            initialView="dayGridMonth"
                            fixedWeekCount={true}
                            dayHeaders={true}
                            events={batch}
                            eventDisplay="block"
                            dayMaxEvents={true}
                            displayEventTime={false}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
