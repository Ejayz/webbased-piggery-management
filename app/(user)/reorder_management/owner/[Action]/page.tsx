"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import printJS from "print-js";
import {
  Confirm,
  getSpecificOrderList,
  Lock,
  Remove,
} from "@/hooks/useReorder";
import {
  validateNormal,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/Errors/PageNotFound";
import { DateTime } from "luxon";

interface reorderListType {
  item_id: number;
  item_name: string;
  quantity: number;
  confirmed: boolean;
}

export default function Page({ params }: any) {
  let list: any = [];
  const [reorderList, setReorderList] = useState<reorderListType[]>([]);
  const [reorder_date, setReorderDate] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [file, setFile] = useState<FileList | null>();
  const [printable, setPrintables] = useState<any>([]);
  const handleQuantity = async (quantity: any, item_id: number) => {
    setReorderList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.item_id === item_id) {
          return { ...item, quantity: quantity };
        } else {
          return item;
        }
      });
      console.log(updatedList);
      return updatedList;
    });
  };
  const handleConfirmQuantity = async (
    confirm_quantity: any,
    item_id: number
  ) => {
    setReorderList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.item_id === item_id) {
          return { ...item, confirm_reorder: confirm_quantity };
        } else {
          return item;
        }
      });
      console.log(updatedList);
      return updatedList;
    });
  };

  const handleConfirm = async (item_id: number) => {
    setReorderList((prevList) => {
      const updatedList = prevList.map((item) => {
        if (item.item_id === item_id) {
          return { ...item, confirmed: true };
        } else {
          return item;
        }
      });
      console.log(updatedList);
      return updatedList;
    });
  };

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  let message: any = [];
  function resetState() {}
  const verifyInput = async (e: any) => {
    e.preventDefault();
    console.log(reorderList);
    if (params.Action == "Update") {
      var isOk = confirm("are you sure you want to update?");
      setIsSubmitting(true);
      if (isOk) {
        setIsSubmitting(false);
        updateUser();
      } else {
        setIsSubmitting(false);
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        setIsSubmitting(false);
        return false;
      }

      exec_remove();
    } else if (params.Action == "Confirm") {
      if (!confirm("Are you sure you want to confirm?")) {
        setIsSubmitting(false);

        return false;
      }
      exect_confirm();
    } else if (params.Action == "View") {
      if (
        confirm(
          "Are you sure you want to lock this order list ? Workers won't be able to remove it."
        )
      ) {
        exec_lock_request();
      }
      setIsSubmitting(false);
    }
  };
  const exec_lock_request = async () => {
    const returned = await Lock(Queryid);
    if (returned.code == 200) {
      alert("Generating printable list....");
      alert(
        "After delivery give the reciept to the worker for them to attach it during confirmation process. Thank you.."
      );
      printJS({
        printable: printable,
        type: "json",
        properties: [
          { field: "item_name", displayName: "Item Name" },
          { field: "Quantity", displayName: "Requested Quantity" },
        ],
        header: ` Reorder List #${Queryid} as of ${reorder_date}:`,
        onPrintDialogClose: function () {
          callCancel(returned.message, "success");
          setIsSubmitting(false);
        },
      });
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  const exect_confirm = async () => {
    const returned = await Confirm(file, Queryid, reorderList);
    if (returned.code == 200) {
      callCancel(returned.message, returned.code);
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function exec_get() {
      const returned = await getSpecificOrderList(Queryid);

      if (returned.code == 200) {
        setReorderDate(
          DateTime.fromISO(returned.data[0].reorder_date).toFormat(
            "MMMM dd, yyyy hh:mm:ssa"
          )
        );
        returned.data.map((data: any, key: number) => {
          list.push({
            item_id: data.item_id,
            item_name: data.item_name,
            quantity: data.reorder_quantity,
            confirm_reorder: 0,
            reorder_detail_id: data.reorder_details_id,
            confirmed: false,
          });
          printable.push({
            item_name: data.item_name,
            Quantity: data.reorder_quantity,
          });
        });
        setReorderList(list);
      }
    }
    exec_get();
  }, []);
  const exec_remove = async () => {
    const returned = await Remove(Queryid);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  const updateUser = async () => {};

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/reorder_management/owner/List");
    } else {
      router.push(
        `/reorder_management/owner/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    const exec = async () => {};
    if (Queryid !== null || Queryid !== undefined) {
      exec().then(() => {
        setStartValidation(true);
      });
    }
  }, [Queryid]);

  console.log(Action);

  if (reorderList.length == 0) {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else if (
    Action != "Update" &&
    Action != "Remove" &&
    Action != "View" &&
    Action != "Confirm"
  ) {
    return <PageNotFound></PageNotFound>;
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">
              Manage User
            </p>
          </div>
        </div>
        <div
          data-theme="light"
          className="card mx-auto text-base-content w-11/12 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>User Management</li>

                <li>View</li>

                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={verifyInput}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div id="itemList" className="overflow-x-auto h-auto mb-4">
                <div>
                  <span className="font-bold">Reorder Id: </span>
                  <span>{Queryid}</span>
                </div>{" "}
                <div>
                  <span className="font-bold">Reorder Date: </span>
                  <span>{reorder_date}</span>
                </div>
                <table className="table w-full">
                  {/* head*/}
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th
                        className={`${
                          Action == "View" || Action == "Remove" ? "hidden" : ""
                        }`}
                      >
                        Confirm Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {reorderList.map((data: any, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{data.item_name}</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              placeholder="Item Quantity"
                              className={`input w-full max-w-xs ${
                                data.quantity === "0" || data.quantity === ""
                                  ? "input-error"
                                  : ""
                              }`}
                              value={data.quantity === 0 ? "" : data.quantity}
                              readOnly={Action == "View"}
                              onChange={(e) => {
                                handleQuantity(e.target.value, data.item_id);
                              }}
                            />

                            <span
                              className={`text-error ${
                                data.quantity === "0" || data.quantity === ""
                                  ? "block"
                                  : "hidden"
                              }`}
                            >
                              Atleast 1 Quantity is required
                            </span>
                          </td>
                          <td
                            className={`${
                              Action == "View" || Action == "Remove"
                                ? "hidden"
                                : ""
                            }`}
                          >
                            <input
                              type="number"
                              min="0"
                              placeholder="Confirm Quantity"
                              className={`input w-full max-w-xs ${
                                Action == "View" ? "hidden" : ""
                              } ${
                                data.confirm_reorder === "0" ||
                                data.confirm_reorder === ""
                                  ? "input-error"
                                  : ""
                              }`}
                              value={
                                data.confirm_reorder === 0
                                  ? ""
                                  : data.confirm_reorder
                              }
                              onChange={(e) => {
                                handleConfirmQuantity(
                                  e.target.value,
                                  data.item_id
                                );
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <input
                type="file"
                className={`file-input file-input-bordered w-full max-w-xs ${
                  Action == "View" || Action == "Remove" ? "hidden" : ""
                }`}
                onChange={(e) => {
                  setFile(e.target.files);
                  console.log(file);
                }}
              />

              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : params.Action == "Remove" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    REMOVE
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    Confirm
                  </button>
                )}
                <button
                  className={`btn btn-active btn-primary mx-4 ${
                    isSubmitting ? "loading" : ""
                  }`}
                >
                  Print List
                </button>
                <Link
                  onClick={(e) => {
                    callCancel();
                  }}
                  className="btn btn-active btn-primary mx-4"
                  href={"/reorder_management/owner/List"}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
