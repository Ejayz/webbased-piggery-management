"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { toast } from "react-toastify";
import { getLowLvl, Create, getTotalReorderList } from "@/hooks/useReorder";

interface reorderListType {
  item_id: number;
  item_name: string;
  quantity: number;
  confirmed: boolean;
}

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  //Reorder vars
  const [reorderList, setReorderList] = useState<reorderListType[]>([]);

  const [requesting, setRequesting] = useState(false);

  const router = useRouter();
  const loading = getUserInfo();
  let list: any = [];

  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (loading.data.job == "owner" || loading.data.job == "veterinarian") {
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
      } else if (returned.code == 404) {
        if (!confirm(`Are you sure you want to create?`)) {
          setRequesting(false);
          return false;
        }
        setRequesting(false);
        createUser();
      } else {
        setRequesting(false);
        toast.error(returned.message);
        return false;
      }
    });
  };

  async function createUser() {
    const returned = await Create(reorderList);
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
      router.push("/reorder_management/worker/List");
    } else {
      toast.error(returned.message);
    }
  }
  useEffect(() => {
    async function exec_get() {
      const returned = await getLowLvl();

      if (returned.code == 200) {
        returned.data.map((data: any, key: number) => {
          list.push({
            item_id: data.item_id,
            item_name: data.item_name,
            quantity: 1,
            confirmed: false,
          });
        });
        setReorderList(list);
      }
    }
    exec_get();
  }, []);

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
                Manage Inventory
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Inventory</li>
                    <li className="font-bold">Creat Inventory</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="overflow-x-auto mb-4">
                    <table className="table w-full">
                      {/* head*/}
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Quantity</th>
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
                                    data.quantity === "0" ||
                                    data.quantity === ""
                                      ? "input-error"
                                      : ""
                                  }`}
                                  value={
                                    data.quantity === 0 ? "" : data.quantity
                                  }
                                  readOnly={data.confirmed}
                                  onChange={(e) => {
                                    handleQuantity(
                                      e.target.value,
                                      data.item_id
                                    );
                                  }}
                                  required={true}
                                />
                                <span
                                  className={`text-error ${
                                    data.quantity === "0" ||
                                    data.quantity === ""
                                      ? "block"
                                      : "hidden"
                                  }`}
                                >
                                  Atleast 1 Quantity is required
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      disabled={requesting}
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Create
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
