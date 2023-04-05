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
import { type } from "os";

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
        <input
          type="checkbox"
          checked={showAddDeworming}
          id="my-modal"
          readOnly={true}
          className="modal-toggle"
        />
        <div className="modal text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Deworming Activity</h3>
            <div
              className={`alert alert-warning shadow-lg ${
                dewormerList.length == 0 ? "" : "hidden"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Warning: There are no items that was categorized as{" "}
                  <span className={"font-bold"}>Medicine</span>! Create one on
                  the Inventory Management Module
                </span>
              </div>
            </div>
            <div>
              <form action="">
                <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                  <NormalInput
                    label={"From"}
                    type={"number"}
                    register={DewormingRegister}
                    errors={DewormingErrors}
                    required={true}
                    validationSchema={{
                      required: "From is required",
                    }}
                    name={"Dewormingfrom"}
                    readonly={true}
                  />
                  <NormalInput
                    label={"To"}
                    type={"number"}
                    name={"Dewormingto"}
                    readonly={true}
                    register={DewormingRegister}
                    errors={DewormingErrors}
                    validationSchema={{
                      required: "To is required",
                      validate: (value: any) => {
                        if (value < watchFrom) {
                          return "To must be greater than from";
                        }
                      },
                    }}
                  />
                  <SelectInput
                    label={"Items"}
                    name={"Dewormingitem_id"}
                    register={DewormingRegister}
                    errors={DewormingErrors}
                    required={true}
                    validationSchema={{
                      required: "Item is required",
                    }}
                    options={dewormerList}
                  ></SelectInput>
                </div>
              </form>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={async () => {
                  const result = await DewormingTrigger([
                    "Dewormingfrom",
                    "Dewormingto",
                    "Dewormingitem_id",
                  ]);
                  console.log(result);

                  if (result) {
                    setActivityList([
                      ...activity_list,
                      {
                        from: watchDewormingFrom,
                        to: watchDewormingTo,
                        item_name: dewormerList.find(
                          (item: any) => item.value == watchDewormingItemId
                        )?.display,
                        item_id: watchDewormingItemId,
                        type: "2",
                      },
                    ]);
                    ActivitySetValue("from", parseInt(watchDewormingTo));
                    ActivitySetValue("to", "");
                    ActivitySetValue("item_id", "");
                    setShowAddDeworming(false);
                  }
                }}
                className="btn  mt-4"
              >
                Confirm
              </button>
              <button
                type={"button"}
                onClick={() => {
                  DewormingReset();
                  setShowAddDeworming(false);
                }}
                className={"btn mt-4"}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
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
                    <li className="font-bold">Create Plans Activity</li>
                  </ul>
                </div>

                <div className={`flex w-full h-auto py-2 flex-col`}>
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    <div>
                      <label className="label"> Plan Name*</label>
                      <input
                        {...ActivityRegister("plan_name", {
                          required: "Plan name is required",
                        })}
                        placeholder="Plan Name"
                        className="input"
                      />
                      <ErrorMessage
                        errors={ActivityErrors}
                        name="plan_name"
                        render={({ message }) => (
                          <p className="mt-2 text-sm  text-error">
                            <span className="font-medium">{message}</span>{" "}
                          </p>
                        )}
                      />
                    </div>
                  </div>{" "}
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    <NormalInput
                      label={"From"}
                      type={"number"}
                      register={ActivityRegister}
                      errors={ActivityErrors}
                      required={true}
                      validationSchema={{
                        required: "From is required",
                      }}
                      name={"from"}
                      readonly={true}
                    />
                    <NormalInput
                      label={"To"}
                      type={"text"}
                      name={"to"}
                      register={ActivityRegister}
                      errors={ActivityErrors}
                      validationSchema={{
                        required: "To is required",
                        validate: (value: any) => {
                          if (value < watchFrom) {
                            return "To must be greater than from";
                          }
                        },
                      }}
                    />
                    <SelectInput
                      label={"Items"}
                      name={"item_id"}
                      register={ActivityRegister}
                      errors={ActivityErrors}
                      required={true}
                      validationSchema={{
                        required: "Item is required",
                      }}
                      options={itemList}
                    ></SelectInput>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const result = await ActivityTrigger([
                        "from",
                        "to",
                        "item_id",
                      ]);
                      console.log(result);

                      if (result) {
                        setActivityList([
                          ...activity_list,
                          {
                            from: watchFrom,
                            to: watchTo,
                            item_name: itemList.find(
                              (item: any) => item.value == watchItemId
                            )?.display,
                            item_id: watchItemId,
                            type: "1",
                          },
                        ]);
                        ActivitySetValue("from", parseInt(watchTo) + 1);
                        ActivitySetValue("to", "");
                        ActivitySetValue("item_id", "");
                        if (
                          confirm("Would you like to add deworming activity ?")
                        ) {
                          DewormingSetValue(
                            "Dewormingfrom",
                            parseInt(watchTo) + 1
                          );
                          DewormingSetValue(
                            "Dewormingto",
                            parseInt(watchTo) + 1
                          );
                          setShowAddDeworming(true);
                        }
                      }
                    }}
                    className="btn  mt-4"
                  >
                    New Activity
                  </button>
                  <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>From</th>
                          <th>To</th>
                          <th>Item Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity_list.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th className="text-center">{index}</th>
                              <td>{item.from}</td>
                              <td>{item.to}</td>
                              <td>{item.item_name}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-error"
                                  onClick={() => {
                                    setActivityList((prev: any) => {
                                      const newList = [...prev];
                                      newList.splice(index, newList.length);
                                      return newList;
                                    });
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      strokeWidth="0"
                                    ></g>
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
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={`card-actions justify-end mt-6 ${
                      finalData ? "hidden" : ""
                    }`}
                  >
                    <button
                      onClick={async () => {
                        const result = await ActivityTrigger(["plan_name"]);
                        if (result && activity_list.length > 0) {
                          onSubmit(watchPlanName, activity_list);
                        }
                      }}
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => {
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
                      }}
                      className="btn mx-4"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
