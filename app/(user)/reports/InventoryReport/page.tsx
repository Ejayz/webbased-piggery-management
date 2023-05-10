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
    "InventoryReport",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Reports/getInventoryReport`
      );
      const data = await response.json();
      if (data.code == 200) {
        if (data.data) {
          setItemList([]);
          data.data.map((item: any) => {
            console.log(data.data);

            setItemList((prev) => {
              return [
                ...prev,
                {
                  item_name: item.item_name,
                  item_description: item.item_description,
                  category_name: item.category_name,
                  available_stocks: `${
                    parseFloat(item.latest_closing_quantity) /
                    parseFloat(item.item_net_weight)
                  } ${item.item_unit}`,
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
        <div className="w-full  h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Inventory Report
              </p>
            </div>

            <div className=" w-11/12 mx-auto  text-base-content  ">
              <div className="">
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
                    <div className="flex flex-col lg:flex-row gap-2 mb-4">
                      <button
                        disabled={requesting}
                        className={`btn btn-active btn-primary mx-4 mt-auto ${
                          itemList.length == 0 ? "hidden" : ""
                        } ${requesting ? "loading" : ""}`}
                        onClick={() => {
                          printJS({
                            printable: itemList,
                            properties: [
                              { field: "item_name", displayName: "Item Name" },
                              {
                                field: "item_description",
                                displayName: "Item Description",
                              },
                              {
                                field: "category_name",
                                displayName: "Category",
                              },
                              {
                                field: "available_stocks",
                                displayName: "Available Stocks",
                              },
                            ],
                            header: `
                            <div style="display:flex;margin:0; width:100%;flex-direction:column;">
                              <div style="width:100%;height:auto;display:flex;margin-left:auto;
                            margin-right:auto;margin-top:5px;margin-bottom:5px; ">
                              <div style="width:25%;display:flex;padding:4px;">
                                  <img src='/assets/rvm_logo.png' width="100" style="=width:100px;height:100px;margin-right:auto;margin-left:auto;" height="100" />
                                </div>
                                <div style="width:50%;margin-top:auto ; margin-bottom:auto;">
                                  <div style="display:flex;justify-content: center;text-align: center; flex-direction: column; padding:4px;">
                                  <span style="font-size:15px;font-weight:bold;font-family:arial;">RVM HOG FARM</span>
                                      <span style="font-size:12px;font-family:arial;">Barangay Lamba,Municipality of Banga, </span>
                                      <span style="font-size:12px;font-family:arial;">South Cotabato ,Philippines </span>
                                  </div>
                                </div>
                                </div>
                              </div>
                             <div style="display:flex;justify-content: left; flex-direction: column; padding:4px;">
                                <span style="font-size:15px;font-weight:bold;font-family:arial;margin-left:10px;">Inventory Report</span>
                             <div style="display:flex;justify-content:left;margin-left:10px;">
                                 <svg style="width:20px;height:20px;margin-top:auto;margin-bottom:auto;" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#212121;}  </style> <g> <path class="st0" d="M354.07,158.485l-213.094,70.516c-0.641,0.219-1.188,0.547-1.813,0.797c-0.922,0.391-1.859,0.734-2.719,1.219 c-0.766,0.406-1.438,0.922-2.156,1.406c-0.719,0.5-1.469,0.969-2.141,1.531c-0.688,0.594-1.297,1.25-1.938,1.891 c-0.578,0.594-1.172,1.172-1.703,1.813c-0.547,0.688-1.016,1.438-1.5,2.156c-0.469,0.734-0.969,1.422-1.375,2.188 c-0.391,0.75-0.688,1.547-1.016,2.328c-0.344,0.813-0.703,1.625-0.969,2.484c-0.25,0.828-0.391,1.719-0.578,2.594 c-0.156,0.828-0.359,1.656-0.453,2.516c-0.094,0.984-0.047,1.984-0.047,2.969c0.016,0.672-0.094,1.297-0.031,1.984 c0.016,0.141,0.063,0.266,0.078,0.422c0.094,0.859,0.313,1.719,0.484,2.578c0.188,0.969,0.344,1.938,0.625,2.844 c0.047,0.125,0.047,0.266,0.094,0.375c0.406,1.234,0.938,2.406,1.484,3.547c0.156,0.313,0.328,0.625,0.5,0.938 c0.688,1.266,1.469,2.453,2.328,3.594c0.328,0.406,0.688,0.766,1.031,1.156c0.719,0.828,1.469,1.609,2.281,2.328 c0.422,0.375,0.859,0.75,1.297,1.094c0.844,0.656,1.719,1.266,2.625,1.813c0.469,0.281,0.906,0.578,1.391,0.844 c1.203,0.625,2.469,1.188,3.766,1.656c0.203,0.063,0.375,0.172,0.578,0.234c1.547,0.5,3.125,0.813,4.75,1.031 c0.391,0.063,0.797,0.078,1.203,0.109c0.781,0.078,1.594,0.188,2.391,0.188c0.5,0,0.984-0.094,1.484-0.109 c0.266-0.031,0.5,0.016,0.75,0.016c11.188-0.938,20.891,2.547,29.688,10.641c5.797,5.344,10.594,12.156,14.328,19.234h-10.656 c-11.938,0-21.594,9.672-21.594,21.609v66.5c0,11.922,9.656,21.594,21.594,21.594h19.141c0,2.281,0,5.063,0,8.203 c-4.328,0-7.828,3.516-7.828,7.844s3.5,7.844,7.828,7.844c0,2.578,0,5.203,0,7.828c-4.328,0-7.828,3.516-7.828,7.828 c0,4.328,3.5,7.844,7.828,7.844c0,7.016,0,13.078,0,16.859c0,15.672,9.406,17.234,25.078,17.234c0,0,3.141,9.406,32.906,9.406 c29.781,0,32.906-9.406,32.906-9.406c15.672,0,25.063-1.563,25.063-17.234c0-3.813,0-9.922,0-17.016 c3.578-0.734,6.281-3.906,6.281-7.688s-2.703-6.953-6.281-7.672c0-2.719,0-5.469,0-8.141c3.578-0.734,6.281-3.906,6.281-7.688 c0-3.797-2.703-6.953-6.281-7.672c0-3.234,0-6.047,0-8.375h20.719c11.938,0,21.594-9.672,21.594-21.594v-66.5 c0-11.938-9.656-21.609-21.594-21.609h-9.453c5.656-12.547,13.969-23.469,25.188-29.578c13.078-7.141,17.906-23.531,10.766-36.625 s-23.547-17.906-36.609-10.781c-30.719,16.75-48.203,46.906-56.531,76.984H253.82c-5.703-18.375-15.75-37.688-29.953-52.984 l147.172-48.688c14.156-4.688,21.828-19.953,17.141-34.109C383.508,161.47,368.227,153.798,354.07,158.485z"></path> <path class="st0" d="M149.445,194.892c2.813,0,5.672-0.438,8.484-1.359l213.109-70.531c14.156-4.688,21.828-19.938,17.141-34.109 c-4.672-14.156-19.938-21.828-34.109-17.141l-213.094,70.516c-14.172,4.688-21.844,19.938-17.156,34.094 C127.57,187.704,138.117,194.892,149.445,194.892z"></path> <path class="st0" d="M167.305,103.36c2.813,0,5.672-0.453,8.484-1.375l149.188-49.359c14.141-4.688,21.828-19.953,17.141-34.109 S322.18-3.312,308.008,1.376L158.836,50.735c-14.172,4.688-21.844,19.953-17.156,34.094 C145.43,96.173,155.977,103.36,167.305,103.36z"></path> </g> </g></svg>
                                    <span style="font-size:12px;font-family:arial;margin-top:auto;margin-bottom:auto;">This report was generated on ${DateTime.now()
                                      .setZone("Asia/Manila")
                                      .toFormat(
                                        "EEEE',' MMM d',' yyyy"
                                      )} ${DateTime.now().toFormat(
                              "h:mma"
                            )}</span>
                               </div>
                            </div>`,
                            style:
                              "td { text-align: center; } @page { size: auto;  margin: 0mm; }",
                            type: "json",
                          });
                        }}
                      >
                        Print
                      </button>
                    </div>
                    <table className="table table-compact w-full table-base-content">
                      {/* head*/}
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Item Description</th>
                          <th>Category</th>
                          <th>Available Stocks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {itemList.length == 0 ? (
                          <tr>
                            <td colSpan={5}>
                              Choose a date range to view the inventory report.
                            </td>
                          </tr>
                        ) : (
                          itemList.map((data: any, key: number) => {
                            return (
                              <tr key={key}>
                                <td>{data.item_name}</td>
                                {/* <td>{data.item_description}</td> */}
                                <td>{data.item_description}</td>
                                <td>{data.category_name}</td>
                                <td>{data.available_stocks}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-actions justify-end"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
