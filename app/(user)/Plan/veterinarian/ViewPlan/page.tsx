"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import Link from "next/link";

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
  const id = useSearchParams().get("id");
  // const { error, data, isLoading } = useQuery("getItems", async () => {
  //   const response = await fetch("/api/post/Plans/getItemsFeeds");
  //   const data = await response.json();
  //   return data;
  // });
  // const {
  //   error: DewormerError,
  //   data: DewormerData,
  //   isLoading: DewormerIsLoading,
  // } = useQuery("getDewormers", async () => {
  //   const response = await fetch("/api/post/Plans/getItemsDewormer");
  //   const data = await response.json();
  //   return data;
  // });

  const { error, data, isLoading } = useQuery(
    ["getDewormers", id != undefined],
    async () => {
      const response = await fetch(
        `/api/get/Plans/getDayObjectives/?plan_id=${id}`
      );
      const data = await response.json();
      return data;
    }
  );
  useEffect(() => {
    if (data) {
      if (data.code == 200) {
        let activity_list = data.data;
        setActivityList(activity_list);
      }
    }
  }, [data]);

  const [allowed, setIsAllowed] = useState(false);
  const [finalData, setFinalData] = useState<finalData>();
  const [activity_list, setActivityList] = useState<ArrayedData[]>([]);
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [showAddDeworming, setShowAddDeworming] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     if (data.code == 200) {
  //       let item_list: { value: any; display: any; disabled: boolean }[] = [];
  //       data.data.map((item: any) => {
  //         item_list.push({
  //           value: item.item_id,
  //           display: item.item_name,
  //           disabled: false,
  //         });
  //       }),
  //         setItemList(item_list);
  //     }
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (DewormerData) {
  //     if (DewormerData.code == 200) {
  //       let item_list: { value: any; display: any; disabled: boolean }[] = [];
  //       DewormerData.data.map((item: any) => {
  //         item_list.push({
  //           value: item.item_id,
  //           display: item.item_name,
  //           disabled: false,
  //         });
  //       }),
  //         setDewormerList(item_list);
  //     }
  //   }
  // }, [DewormerData]);

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
                    <li className="font-bold">View Plans Activity</li>
                  </ul>
                </div>

                <div className={`flex w-full h-auto py-2 flex-col`}>
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
                    <Link className="btn mx-4" href={"Plan/veterinarian/List"}>
                      Back
                    </Link>
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
