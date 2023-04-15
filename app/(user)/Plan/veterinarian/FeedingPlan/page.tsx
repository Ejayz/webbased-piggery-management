"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useUserManagement";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PasswordInputShow from "@/components/FormCompsV2/PasswordInputShow";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "react-query";
import { createPlan } from "@/hooks/usePlan";
import NormalInputNoLabel from "@/components/FormCompsV2/NormalInputNoLabel";
import SelectInputNoLabel from "@/components/FormCompsV2/SelectInputNoLabel";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Weaner from "@/components/FeedingPlan/Weaner";
import Grower from "@/components/FeedingPlan/Grower";
import Finisher from "@/components/FeedingPlan/Finisher";

interface finalData {
  plan_name?: string;
}
interface ArrayedData {
  from: string;
  to: string;
  item_name: string;
  item_id: string;
  type: string;
}
export default function Page() {
  const [itemList, setItemList] = useState<any>([]);
  const [dewormerList, setDewormerList] = useState<any>([]);
  const { error, data, isLoading } = useQuery("getItems", async () => {
    const response = await fetch("/api/post/Plans/getItemsFeeds");
    const data = await response.json();
    return data;
  });
  const {
    error: DewormerError,
    data: DewormerData,
    isLoading: DewormerIsLoading,
  } = useQuery("getDewormers", async () => {
    const response = await fetch("/api/post/Plans/getItemsDewormer");
    const data = await response.json();
    return data;
  });

  const [allowed, setIsAllowed] = useState(false);
  const [finalData, setFinalData] = useState<finalData>();
  const [activity_list, setActivityList] = useState<ArrayedData[]>([]);
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [showAddDeworming, setShowAddDeworming] = useState(false);
  const [tab, setTab] = useState("Weaner");

  const {
    register: DewormingRegister,
    handleSubmit: DewormingHandleSubmit,
    reset: DewormingReset,
    watch: DewormingWatch,
    setValue: DewormingSetValue,
    trigger: DewormingTrigger,
    control: DewormingControl,
    formState: {
      errors: DewormingErrors,
      isSubmitSuccessful: DewormingIsSubmitSuccessful,
      isSubmitting: DewormingIsSubmitting,
      isSubmitted: DewormingIsSubmitted,
    },
  } = useForm<any>({
    defaultValues: {
      Dewormingfrom: "0",
      Dewormingto: "",
      Dewormingitem_name: "",
      Dewormingitem_id: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  const watchDewormingFrom = DewormingWatch("Dewormingfrom");
  const watchDewormingTo = DewormingWatch("Dewormingto");
  const watchDewormingItemId = DewormingWatch("Dewormingitem_id");

  useEffect(() => {
    if (data) {
      if (data.code == 200) {
        let item_list: { value: any; display: any; disabled: boolean }[] = [];
        data.data.map((item: any) => {
          item_list.push({
            value: item.item_id,
            display: item.item_name,
            disabled: false,
          });
        }),
          setItemList(item_list);
      }
    }
  }, [data]);

  useEffect(() => {
    if (DewormerData) {
      if (DewormerData.code == 200) {
        let item_list: { value: any; display: any; disabled: boolean }[] = [];
        DewormerData.data.map((item: any) => {
          item_list.push({
            value: item.item_id,
            display: item.item_name,
            disabled: false,
          });
        }),
          setDewormerList(item_list);
      }
    }
  }, [DewormerData]);

  const {
    register: ActivityRegister,
    handleSubmit: ActivityHandleSubmit,
    reset: ActivityReset,
    watch: ActivityWatch,
    setValue: ActivitySetValue,
    trigger: ActivityTrigger,
    formState: { errors: ActivityErrors },
  } = useForm<any>({
    defaultValues: {
      plan_name: "",
      from: "1",
      to: "",
      item_name: "",
      item_id: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });

  const watchFrom = ActivityWatch("from");
  const watchTo = ActivityWatch("to");
  const watchItemId = ActivityWatch("item_id");
  const watchItemName = ActivityWatch("item_name");
  const watchPlanName = ActivityWatch("plan_name");

  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (loading.data.job == "worker" || loading.data.job == "owner") {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);

  const onSubmit = async (plan_name: any, activity_list: any) => {
    setRequesting(true);
    const response = await createPlan(plan_name, activity_list);
    if (response.code == 200) {
      setActivityList([]);
      ActivityReset(
        {
          plan_name: "",
          from: 1,
          to: "",
          item_id: "",
        },
        { keepDefaultValues: true }
      );
      setRequesting(false);
      toast.success(response.message);
    } else {
      setRequesting(false);
    }
  };

  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <div className="w-full bg-base-100 h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage Plans
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Plan</li>
                    <li className="font-bold">Feeding Plans</li>
                  </ul>
                </div>
                <div className={`flex w-11/12 h-full py-2 flex-col`}>
                  <div className="tabs">
                    <button
                      onClick={() => {
                        setTab("Weaner");
                      }}
                      className={`tab tab-bordered ${
                        tab == "Weaner" ? "tab-active" : ""
                      }`}
                    >
                      Weaner
                    </button>
                    <button
                      onClick={() => {
                        setTab("Grower");
                      }}
                      className={`tab tab-bordered ${
                        tab == "Grower" ? "tab-active" : ""
                      }`}
                    >
                      Grower
                    </button>
                    <button
                      onClick={() => {
                        setTab("Finisher");
                      }}
                      className={`tab tab-bordered ${
                        tab == "Finisher" ? "tab-active" : ""
                      }`}
                    >
                      Finisher
                    </button>
                  </div>
                  {tab == "Weaner" ? (
                    <Weaner />
                  ) : tab == "Grower" ? (
                    <Grower />
                  ) : (
                    <Finisher />
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
