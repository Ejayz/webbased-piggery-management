"use client";
import RightDisplay from "@/components/FormCompsV2/RightDisplay";
import Table from "@/components/TableBody/Table";
import { ConfirmIndividualSchedule } from "@/hooks/useSchedule";
import { getData, Search, sortData } from "@/hooks/useUserManagement";
import { DateTime } from "luxon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

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
export default function Page() {
  const id = useSearchParams().get("id");

  const { isLoading, isFetching, data, refetch, error } = useQuery(
    "userData",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Operation/getBatchCheckList/getBatchCheckList/?batch_id=${id}`
      );
      const data = await response.json();
      console.log(data);
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
  const [parsed, setParsed] = useState<User[]>([]);
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

  console.log(submitable);

  useEffect(() => {
    if (data) {
      if (data.data) {
        setParsed(data.data);
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
    console.log(msg);
    console.log(status);
    if (msg != null) {
      if (status == "success") {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, []);
  console.log(parsed);
  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
    setValue: setValue,
    watch,
  } = useForm({
    defaultValues: {
      item_quantity: "",
    },
    criteriaMode: "all",
    mode: "all",
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const watchQuantity = watch("item_quantity");

  return (
    <>
      <input
        type="checkbox"
        checked={showForm}
        readOnly={true}
        id="my-modal"
        className="modal-toggle"
      />
      <div className="modal text-base-content">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Enter the quantity of the item you have used
          </h3>
          <div>
            <RightDisplay
              name="item_quantity"
              label={"Item Quantity"}
              type={"number"}
              register={register}
              errors={errors}
              item_unit={submitable?.item_unit}
              validationSchema={{
                required: "This field is required",
              }}
            />
          </div>
          <div className="modal-action">
            <button
              className={"btn btn-primary btn-sm"}
              onClick={async () => {
                const returned = await ConfirmIndividualSchedule(
                  submitable?.operation_id,
                  watchQuantity
                );
                if (returned.code == 200) {
                  setShowForm(false);
                  refetch();
                  toast.success(returned.message);
                }
              }}
            >
              Confirm
            </button>
            <button
              className={"btn  btn-sm"}
              onClick={() => {
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            Operation Calendar
          </p>
        </div>

        <div className="w-full h-auto flex flex-col">
          <table className="table table-compact w-11/12  mx-auto  text-base-content">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>AM/PM</th>
                <th>Type</th>
                <th>Item Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    Please wait while we fetch the data
                  </td>
                </tr>
              ) : parsed.length != 0 ? (
                parsed.map((item: any, key: number) => {
                  return (
                    <tr key={key} className="hover">
                      <th>{key + 1}</th>
                      <td>
                        {DateTime.fromISO(item.operation_date)
                          .setZone("Asia/Manila")
                          .toFormat("EEEE',' MMM d',' yyyy")}
                      </td>
                      <td>{item.am_pm}</td>
                      <td>{item.type}</td>
                      <td>{item.item_name}</td>
                      <td className="flex">
                        <div className="flex flex-row mx-auto">
                          <button
                            className="btn btn-sm btn-primary"
                            disabled={
                              DateTime.fromISO(item.operation_date)
                                .setZone("Asia/Manila")
                                .toFormat("EEEE',' MMM d',' yyyy") ==
                              DateTime.now().toFormat("EEEE',' MMM d',' yyyy")
                                ? false
                                : true
                            }
                            onClick={() => {
                              setShowForm(true);
                              getData({
                                item_id: item.item_id,
                                item_quantity: "0",
                                batch_id: item.batch_id,
                                operation_id: item.operation_id,
                                item_unit: item.item_unit,
                              });
                            }}
                          >
                            Confirm Activity
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-full mt-4  flex">
            <div className="btn-group grid grid-cols-2 mx-auto">
              <button
                onClick={() => {
                  setPage(page == 1 ? 1 : page - 1);
                }}
                className="btn btn-outline"
              >
                Previous page
              </button>
              <button
                onClick={() => {
                  if (parsed.length != 0) {
                    setPage(page + 1);
                  }
                }}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
