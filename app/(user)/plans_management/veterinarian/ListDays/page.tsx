"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/usePigManagement";
import { RemoveDay } from "@/hooks/usePlan";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface Cage {
  cage_name: String;
  cage_type: String;
  cage_capacity: Number;
}

interface ApiData {
  code: number;
  data: Cage[];
}

export default function Page() {
  const [parsed, setParsed] = useState<Cage[]>([]);
  const id = useSearchParams().get("id");
  const [filter, setFilter] = useState({
    sortby: "day",
    sortorder: "asc",
    keyword: "",
    plan_id: id,
  });
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");

  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "cage",
    async () => {
      let headersList = {
        Accept: "*/*",
      };
      let response = await fetch(
        `${
          location.origin
        }/api/get/Plans/PlanDays/${page}/?&filter=${JSON.stringify(filter)}`,
        {
          method: "GET",
          headers: headersList,
        }
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
    }
  );
  console.log(data);
  useEffect(() => {
    if (data !== undefined) {
      if (data.data) {
        setParsed(data.data);
      } else {
        setParsed([]);
      }
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [filter.sortby]);
  useEffect(() => {
    refetch();
  }, [filter.sortorder]);
  useEffect(() => {
    refetch();
  }, [page]);
  useEffect(() => {
    if (msg != null) {
      if (status == "success") {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    }
  }, []);
  console.log(content);
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">Pig List</p>
        </div>

        <div className="w-full h-auto flex flex-col">
          <div className="w-11/12 mx-auto flex flex-row my-2 text-base-content">
            <span className="uppercase text-xl font-bold my-auto">
              Filters:
            </span>
            <select
              className="select select-bordered my-auto w-full max-w-xs text-base-content mx-2"
              onChange={(e) => {
                setFilter({ ...filter, sortorder: e.target.value });
              }}
              value={filter.sortorder}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select
              className="select select-bordered my-auto w-full max-w-xs text-base-content mx-2"
              onChange={(e) => {
                setFilter({ ...filter, sortby: e.target.value });
              }}
              value={filter.sortby}
            >
              <option value="day">Days</option>
              <option value="total_objectives">Total Objectives</option>
            </select>
            <div className="form-control my-auto text-base-content mx-2">
              <div className="input-group">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    refetch();
                  }}
                  onChange={(e: any) => {
                    e.preventDefault();
                    if (e.target.value == "") {
                      refetch();
                    }
                  }}
                  className="flex"
                >
                  <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered my-auto"
                    onChange={(e) => {
                      setFilter({ ...filter, keyword: e.target.value });
                    }}
                    value={filter.keyword}
                  />
                  <button className="btn my-auto btn-square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <table
            data-theme="dark"
            className="table table-compact w-11/12  mx-auto  text-center"
          >
            <thead>
              <tr>
                <th></th>
                <th>Day</th>
                <th>Total Objective</th>
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
                      <td>{item.day}</td>
                      <td>{item.total_objectives}</td>
                      <td className="flex">
                        <div className="flex flex-row mx-auto">
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname:
                                "/plans_management/veterinarian/ListDays/ListObjectives",
                              query: { id: item.plan_detail_id },
                            }}
                          >
                            View Objectives
                          </Link>
                          {/* <div className="divider divider-horizontal"></div>
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: "/pig_management/worker/View",
                              query: { id: item.pig_id },
                            }}
                          >
                            View
                          </Link> */}
                          <div className="divider divider-horizontal"></div>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={async () => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this day?"
                                )
                              ) {
                                const returned = await RemoveDay(
                                  item.plan_detail_id
                                );
                                if (returned.code == 200) {
                                  toast.success(returned.message);
                                  refetch();
                                } else {
                                  toast.error(returned.message);
                                }
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">
                  <td colSpan={4} className="text-center">
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
