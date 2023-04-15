"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { toast } from "react-toastify";
import { getLowLvl, Create, getTotalReorderList } from "@/hooks/useReorder";
import { useQuery } from "react-query";
import printJS from "print-js";
import { DateTime } from "luxon";

interface reorderListType {
  item_id: number;
  item_name: string;
  quantity: number;
  confirmed: boolean;
}

interface itemListT {
  item_name: string;
}
export default function Page() {
  const [allowed, setIsAllowed] = useState(false);
  const [itemList, setItemList] = useState<itemListT[]>([]);
  const [reorderList, setReorderList] = useState<reorderListType[]>([]);
  const [requesting, setRequesting] = useState(false);
  const [range, setRange] = useState({
    from: "",
    to: "",
  });

  const { error, data, isLoading, refetch } = useQuery(
    "DewormingReport",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Reports/getVaccinationReports?from=${range.from}&to=${range.to}`
      );
      const data = await response.json();
      if (data.code == 200) {
        if (data.data) {
          setItemList([]);
          data.data.map((item: any) => {
            setItemList((prev) => {
              return [
                ...prev,
                {
                  item_name: item.item_name,
                  item_description: item.item_description,
                  type:
                    item.batch_id !== null
                      ? "Batch"
                      : item.cage_id !== null
                      ? "Cage"
                      : item.pig_id !== null
                      ? "Cage"
                      : "",
                  patient:
                    item.batch_id !== null
                      ? item.batch_id
                      : item.cage_id !== null
                      ? item.cage_id
                      : item.pig_id !== null
                      ? item.pig_id
                      : "",
                  operation_date: DateTime.fromISO(item.operation_date)
                    .setZone("Asia/Manila")
                    .toFormat("EEEE',' MMM d',' yyyy"),
                  quantity: `
                    ${
                      parseInt(item.quantity) / parseInt(item.item_net_weight)
                    } ${item.item_unit}`,
                  status: item.status,
                },
              ];
            });
          });
        } else {
          setItemList([]);
        }
      }
    }
  );

  const router = useRouter();
  const loading = getUserInfo();
  let list: any = [];

  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (
          loading.data.job == "worker" ||
          loading.data.job == "veterinarian"
        ) {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);
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

  function resetState() {}

  const validate = async (e: any) => {
    e.preventDefault();
    setRequesting(true);
    reorderList.forEach((data) => {
      if (data.quantity == 0) {
        toast.error("Quantity should be atleast 1");
        return false;
      }
    });
    getTotalReorderList().then((returned) => {
      if (returned.code == 200) {
        if (
          !confirm(
            `Currently there is still ${returned.count} pending reorder list. Are you sure you want to create?`
          )
        ) {
          setRequesting(false);
          return false;
        }
        setRequesting(false);

        createUser();
      } else {
        setRequesting(false);
        toast.error(returned.message);
      }
    });
  };
  useEffect(() => {
    if (range.from != "" && range.to != "") {
      refetch();
    }
  }, [range]);

  async function createUser() {
    const returned = await Create(reorderList);
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
    } else {
      toast.error(returned.message);
    }
  }

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
                Reorder List
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Reports</li>
                    <li className="font-bold">Inventory Report</li>
                  </ul>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="overflow-x-auto mb-4">
                    <div>
                      Filter: From:
                      <input
                        type="date"
                        className="input input-bordered"
                        value={range.from}
                        onChange={(e) => {
                          setRange({ ...range, from: e.target.value });
                        }}
                      />{" "}
                      - To:
                      <input
                        type="date"
                        className="input input-bordered"
                        value={range.to}
                        onChange={(e) => {
                          setRange({ ...range, to: e.target.value });
                        }}
                      />
                    </div>
                    <table className="table table-compact w-full table-base-content">
                      {/* head*/}
                      <thead>
                        <tr>
                          <th>Pateint</th>
                          <th>Item Name</th>
                          <th>Item Description</th>
                          <th>Type</th>
                          <th>Operation Date</th>
                          <th>Quantity</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {itemList.length == 0 ? (
                          <tr>
                            <td colSpan={2}>
                              Choose a date range to view the inventory report.
                            </td>
                          </tr>
                        ) : (
                          itemList.map((data: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td>{data.patient}</td>
                                <td>{data.item_name}</td>
                                <td>{data.item_description}</td>
                                <td>{data.type}</td>
                                <td>{data.operation_date}</td>
                                <td className="uppercase">{`${data.quantity}`}</td>
                                <td>{data.status}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      disabled={requesting}
                      className={`btn btn-active btn-primary mx-4 ${
                        itemList.length == 0 ? "hidden" : ""
                      } ${requesting ? "loading" : ""}`}
                      onClick={() => {
                        console.log(itemList);
                        printJS({
                          printable: itemList,
                          properties: [
                            { field: "patient", displayName: "Patient" },
                            { field: "item_name", displayName: "Item Name" },
                            {
                              field: "item_description",
                              displayName: "Item Description",
                            },
                            {
                              field: "type",
                              displayName: "Type",
                            },
                            {
                              field: "operation_date",
                              displayName: "Operation Date",
                            },
                            {
                              field: "quantity",
                              displayName: "Quantity",
                            },
                            {
                              field: "status",
                              displayName: "Status",
                            },
                          ],
                          type: "json",
                        });
                      }}
                    >
                      Print
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
