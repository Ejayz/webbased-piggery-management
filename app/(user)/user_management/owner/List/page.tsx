"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/useUserManagement";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Image from "next/image";
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
  const { isLoading, isFetching, data, refetch, error } = useQuery(
    "userData",
    async () => {
      const response = await fetch(
        `${
          location.origin
        }/api/get/UserManagement/${page}?filter=${JSON.stringify(filter)}`
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
    sortby: "username",
    sortorder: "asc",
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
      setPage(1);
      refetch();
    }
  }, [filter]);
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
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">User List</p>
        </div>

        <div className="w-full h-auto flex flex-col">
          <div className="w-11/12 mx-auto flex flex-col gap-2 lg:flex-row my-2 text-base-content">
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
              <option value="username">Username</option>
              <option value="name">Name</option>
              <option value="job">Job</option>
              <option value="phone">Phone</option>
            </select>
            <div className="form-control my-auto text-base-content mx-2">
              <div className="input-group">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    refetch();
                  }}
                  className="flex input-group"
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
          <div className="overflow-x-auto">
            <table className="table table-compact w-11/12  mx-auto  text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Phone</th>
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
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.job}</td>
                        <td>{item.phone}</td>
                        <td className="flex">
                          <div className="flex flex-row mx-auto">
                            <Link
                              className="btn btn-sm btn-warning"
                              href={{
                                pathname: "/user_management/owner/Update",
                                query: { id: item.user_id },
                              }}
                            >
                              <Image
                                src="/assets/table/edit.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              Update
                            </Link>
                            <div className="divider divider-horizontal"></div>
                            <Link
                              className="btn btn-sm btn-primary"
                              href={{
                                pathname: "/user_management/owner/View",
                                query: { id: item.user_id },
                              }}
                            >
                              <Image
                                src="/assets/table/view.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              View
                            </Link>
                            <div className="divider divider-horizontal"></div>
                            <Link
                              className="btn btn-sm btn-error"
                              href={{
                                pathname: "/user_management/owner/Remove",
                                query: { id: item.user_id },
                              }}
                            >
                              <Image
                                src="/assets/table/remove.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              Remove
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
          </div>
          <div className="w-full mt-4  flex">
            <div className="btn-group grid grid-cols-3 mx-auto">
              <button
                onClick={() => {
                  setPage(page == 1 ? 1 : page - 1);
                }}
                className="btn"
              >
                «
              </button>
              <button className="btn">Page {page}</button>
              <button
                onClick={() => {
                  if (parsed.length != 0) {
                    setPage(page + 1);
                  }
                }}
                className={`btn ${parsed.length == 0 ? "hidden" : ""}`}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
