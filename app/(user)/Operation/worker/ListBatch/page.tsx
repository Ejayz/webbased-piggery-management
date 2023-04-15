"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/useUserManagement";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
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
  const [parsed, setParsed] = useState<User[]>([]);
  const [colsData, setColsData] = ["username", "name", "job", "phone"];
  const colsName = ["username", "name", "job", "phone"];
  const [isSorting, setisSorting] = useState(false);
  const pathname = "/user_management/owner";
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");
  const { isLoading, isFetching, data, refetch, error } = useQuery(
    "userData",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Operation/${page}?filter=${JSON.stringify(
          filter
        )} `
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
    }
  );

  const [filter, setFilter] = useState({
    sortby: " batch_name",
    sortorder: "desc",
    keyword: "",
  });

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
    if (filter.sortby != "" && filter.sortorder != "") {
      refetch();
    }
  }, [filter.sortby, filter.sortorder]);

  useEffect(() => {
    refetch();
  }, [page]);


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
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            Operation Calendar
          </p>
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
            <div className="form-control my-auto text-base-content mx-2">
              <div className="input-group">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    refetch();
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
          <table className="table table-compact w-11/12  mx-auto  text-base-content">
            <thead>
              <tr>
                <th></th>
                <th>Batch Name</th>
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
                      <td>{item.batch_name}</td>
                      <td className="flex">
                        <div className="flex flex-row mx-auto">
                          <Link
                            target="_blank"
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: "/Operation/worker/ListBatch/Activity",
                              query: { id: item.batch_id },
                            }}
                          >
                            View Activities
                          </Link>
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
