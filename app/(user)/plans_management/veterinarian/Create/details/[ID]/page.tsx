"use client";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useUserManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PasswordInputShow from "@/components/FormCompsV2/PasswordInputShow";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "react-query";
import { createPlan, createPlanObjectives } from "@/hooks/usePlan";
import { randomInt } from "crypto";
import { validateNumber } from "@/hooks/useValidation";

interface ObjectiveList {
  objective_name: string;
  objective_type: string;
  item_details: itemDetails[];
}
interface itemDetails {
  item_id: string;
  item_name: string;
  item_quantity: string;
}

export default function Page({ params }: any) {
  const {
    register: registerPlan,
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
    defaultValues: { objective_name: "", objective_type: "" },
    criteriaMode: "all",
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: { item_name: "", item_quantity: "", item_id: "" },
    criteriaMode: "all",
    mode: "onChange",
  });
  const {
    register: registerDay,
    handleSubmit: handleSubmitDay,
    reset: resetDay,
    watch: watchDay,
    setValue: setValueDay,
    trigger: triggerDay,
    formState: {
      errors: errorsDay,
      isSubmitSuccessful: isSubmitSuccessfulDay,
      isSubmitting: isSubmittingDay,
      isSubmitted: isSubmittedDay,
    },
  } = useForm({
    defaultValues: { day: "0" },
    criteriaMode: "all",
    mode: "onChange",
  });
  const [allowed, setIsAllowed] = useState(false);
  const [finalData, setFinalData] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [itemList, setItemList] = useState<any>([]);
  const [objectiveList, setObjectiveList] = useState<ObjectiveList[]>([]);
  const [day, setDay] = useState(0);
  const router = useRouter();
  const loading = getUserInfo();
  const id = params.ID;
  const [addItem, setAddItem] = useState(false);
  const { data, isLoading, error, refetch } = useQuery(
    "getItems",
    async () => {
      const resposne = await fetch(
        `${location.origin}/api/get/Plans/getItemList`
      );
      const data = await resposne.json();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
    }
  );

  const createPlan = async () => {
    if (!confirm("Are you sure you want to create this objective plan?")) {
      return false;
    } else {
      const returned: any = await createPlanObjectives(id, day, objectiveList);
      if (returned.code == 200) {
        toast.success(returned.message);
        if (!confirm("Would you like to create another objective?")) {
          open("/plans_management/veterinarian/Create", "_self");
        } else {
          //Reset everything
          reset();
          setAddItem(false);
          resetPlan();
          setFinalData("");
          setObjectiveList([]);
          setDay(0);
        }
      } else {
        toast.error(returned.message);
      }
    }
  };

  useEffect(() => {
    if (data != undefined) {
      if (data.data) {
        setItemList(
          data.data.map((item: any) => {
            return {
              value: item.item_id,
              display: item.item_name,
              disabled: false,
            };
          })
        );
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

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

  function resetState() {
    resetPlan();
  }

  const onSubmitPlan = async (data: any) => {
    setObjectiveList([
      ...objectiveList,
      {
        objective_name: data.objective_name,
        objective_type: data.objective_type,
        item_details: [],
      },
    ]);
    setAddItem(true);
  };

  const onSubmit = async (data: any) => {
    data.item_name = itemList.find(
      (item: any) => item.value == data.item_id
    ).display;
    setObjectiveList((objectiveList) => {
      objectiveList[objectiveList.length - 1].item_details.push({
        item_id: data.item_id,
        item_name: data.item_name,
        item_quantity: data.item_quantity,
      });
      return objectiveList;
    });
    reset();
  };
  const validateNumber = (value: any) => {
    if (value.includes(".")) {
      return "Please enter a valid day";
    }
    return true;
  };
  const onSubmitDay = async (data: any) => {
    setDay(data.day);
  };
  console.log(day);
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
                    <li className="font-bold">Create Plan Details</li>
                  </ul>
                </div>
                <div>
                  <form
                    onSubmit={handleSubmitDay(onSubmitDay)}
                    method="post"
                    className={`flex w-full h-auto py-2 flex-col`}
                  >
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Day*</span>
                      </label>
                      <input
                        {...registerDay("day", {
                          required: "Please enter a valid day",
                          pattern: {
                            value: /^\.[0-9]+|[0-9]+(?:\.[0-9]+)?$/,
                            message: "Please enter a valid day",
                          },
                          validate: validateNumber,

                          min: {
                            value: 1,
                            message: "Please enter a valid day",
                          },
                        })}
                        type="number"
                        placeholder="Day"
                        className="input input-bordered w-full max-w-xs"
                        readOnly={day == 0 ? false : true}
                        step={0}
                      />
                      <ErrorMessage
                        errors={errorsDay}
                        name={"day"}
                        render={({ message }) => (
                          <p className="mt-2 text-sm  text-error">
                            <span className="font-medium">{message}</span>{" "}
                          </p>
                        )}
                      />
                    </div>
                    <div
                      className={`card-actions justify-end mt-6 ${
                        day != 0 ? "hidden" : ""
                      }`}
                    >
                      <button
                        className={`btn btn-active  mx-4 ${
                          requesting ? "loading" : ""
                        }`}
                      >
                        Add objective
                      </button>
                      <button
                        type="reset"
                        onClick={() => {
                          resetPlan();
                        }}
                        className="btn mx-4"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
                <form
                  onSubmit={handleSubmitPlan(onSubmitPlan)}
                  method="post"
                  className={`flex w-full h-auto py-2 flex-col ${
                    day == 0 ? "hidden" : ""
                  }`}
                >
                  {" "}
                  <div className="alert alert-info shadow-lg">
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
                      <span>Add objective for the day.</span>
                    </div>
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    <NormalInput
                      name="objective_name"
                      label="Objective Name"
                      register={registerPlan}
                      errors={errorsPlan}
                      required={true}
                      readonly={addItem}
                      validationSchema={{
                        required: "Objective Name is required",
                      }}
                    />
                    <SelectInput
                      name="objective_type"
                      label="Type"
                      register={registerPlan}
                      errors={errorsPlan}
                      required={true}
                      disabled={addItem}
                      validationSchema={{ required: "Type is required" }}
                      options={[
                        {
                          value: "Vaccination",
                          display: "Vaccination",
                          disabled: addItem,
                        },
                        {
                          value: "Deworming",
                          display: "Deworming",
                          disabled: addItem,
                        },
                        {
                          value: "Feeding",
                          display: "Feeding",
                          disabled: addItem,
                        },
                        {
                          value: "Medicine Administration",
                          display: "Medicine Administration",
                          disabled: addItem,
                        },
                      ]}
                    />
                  </div>
                  <div className="overflow-x-auto"></div>
                  <div
                    className={`card-actions justify-end mt-6 ${
                      addItem ? "hidden" : ""
                    }`}
                  >
                    <button
                      className={`btn btn-active  mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Add objective
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        resetPlan();
                      }}
                      className="btn mx-4"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDay(0);
                        resetPlan();
                      }}
                      className="btn mx-4"
                    >
                      Back
                    </button>
                  </div>
                </form>
                {/* This is for from item */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className={`flex w-full h-auto py-2 flex-col ${
                    addItem ? "" : "hidden"
                  }`}
                >
                  <div className="alert alert-info shadow-lg">
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
                      <span>Add item for the objective.</span>
                    </div>
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    {" "}
                    <SelectInput
                      name="item_id"
                      label="Item"
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{ required: "Type is required" }}
                      options={itemList}
                    />
                    <NormalInput
                      name="item_quantity"
                      label="Objective Name"
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "Objective Name is required",
                      }}
                    />
                  </div>
                  <div className="overflow-x-auto"></div>
                  <div
                    className={`card-actions justify-end mt-6 ${
                      finalData != "" ? "hidden" : ""
                    }`}
                  >
                    <button
                      className={`btn btn-active mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Add item to list
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
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          objectiveList[objectiveList.length - 1].item_details
                            .length == 0
                        ) {
                          toast.error(
                            "Please add atleast one item or remove the objective"
                          );
                        } else {
                          reset();
                          setAddItem(false);
                          resetPlan();
                        }
                      }}
                      className="btn mx-4"
                    >
                      Done
                    </button>
                  </div>
                </form>
              </div>
              <table className="table w-11/12 mx-auto">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Objective Name</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {objectiveList.length == 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <span>No objective added yet.</span>
                      </td>
                    </tr>
                  ) : (
                    objectiveList.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <tr key={index + 11123} className="">
                            <th className="table-cell">{index + 1}</th>
                            <td className="table-cell">
                              {" "}
                              {item.objective_name}
                            </td>
                            <td>{item.objective_type}</td>
                            <td>
                              <button
                                className="underline link px-2 "
                                type="button"
                                onClick={() => {
                                  setObjectiveList((objectiveList) => {
                                    //Remove an item from the array
                                    objectiveList.splice(index, 1);
                                    return [...objectiveList];
                                  });
                                  setAddItem(false);
                                  reset();
                                  resetPlan();
                                }}
                              >
                                [Remove]
                              </button>
                            </td>
                          </tr>
                          <tr key={index + 4523}>
                            <td className="" colSpan={4}>
                              <div className="collapse p-0 text-center">
                                <input className="h-4" type="checkbox" />
                                <div className="collapse-title text-sm link underline">
                                  show/hide item
                                </div>
                                <div className="collapse-content">
                                  <table className="table w-full">
                                    <thead>
                                      <tr>
                                        <td></td>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.item_details == undefined ||
                                      item.item_details.length == 0 ? (
                                        <tr>
                                          <td
                                            className="mx-auto text-center"
                                            colSpan={4}
                                          >
                                            <span>No item added yet</span>
                                          </td>
                                        </tr>
                                      ) : (
                                        item.item_details.map(
                                          (item: any, key: number) => {
                                            return (
                                              <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.item_name}</td>
                                                <td>{item.item_quantity}</td>
                                                <td>
                                                  <button
                                                    className="underline link px-2 "
                                                    type="button"
                                                    onClick={() => {
                                                      //remove this item from objectiveList

                                                      setObjectiveList(
                                                        (
                                                          objectiveList: any
                                                        ) => {
                                                          let temp = [
                                                            ...objectiveList,
                                                          ];
                                                          temp[
                                                            index
                                                          ].item_details.splice(
                                                            key,
                                                            1
                                                          );
                                                          return temp;
                                                        }
                                                      );
                                                    }}
                                                  >
                                                    [Remove]
                                                  </button>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
              <div
                className={`card-actions justify-end mt-2 mb-2 ${
                  finalData != "" ? "hidden" : ""
                }`}
              >
                <button
                  className={`btn btn-active mx-4 btn-primary ${
                    requesting ? "loading" : ""
                  }`}
                  onClick={() => {
                    if (objectiveList.length == 0) {
                      toast.error("Please add atleast one objective");
                    } else {
                      createPlan();
                    }
                  }}
                >
                  Create
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    //reset everthing
                    reset();
                    setAddItem(false);
                    resetPlan();
                    setFinalData("");
                    setObjectiveList([]);
                    setDay(0);
                  }}
                  className="btn mx-4"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
