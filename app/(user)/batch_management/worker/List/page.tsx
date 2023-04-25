"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/usePigManagement";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function Page() {
  const [parsed, setParsed] = useState([]);
  const [filter, setFilter] = useState({
    sortby: "batch_name",
    sortorder: "asc",
    keyword: "",
  });
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
        }/api/get/BatchManagement/${page}/?&filters=${JSON.stringify(filter)}`,
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
  console.log(parsed);
  useEffect(() => {
    if (data !== undefined) {
      if (data.data) {
        setParsed(data.data[0]);
      } else {
        setParsed([]);
      }
    }
  }, [data]);
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      refetch();
    }
  }, [filter.sortby]);
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      refetch();
    }
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
  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">Batch List</p>
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
              <option value="batch_name">Batch Name</option>
              <option value="sow_id">Sow</option>
              <option value="boar_id">Boar</option>
              <option value="batch_capacity">Total Pigs</option>
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
          <div className="overflow-x-auto mx-auto w-11/12">
            <table className="table table-compact w-11/12  mx-auto  text-base-content">
              <thead>
                <tr>
                  <th></th>
                  <th>Batch Name</th>
                  <th>Sow</th>
                  <th>Boar</th>
                  <th>Total Pig</th>
                  {/* <th>Action</th> */}
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
                        <td>{item.sow_id != null ? item.sow_id : "N/A"}</td>
                        <td>{item.boar_id != null ? item.boar_id : "N/A"}</td>
                        <td>{item.batch_capacity}</td>
                        {/* <td className="flex">
                        <div className="flex flex-row mx-auto">
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: "/pig_management/worker/Update",
                              query: { id: item.pig_id },
                            }}
                          >
                            Update
                          </Link>
                          <div className="divider divider-horizontal"></div>
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: "/pig_management/worker/View",
                              query: { id: item.pig_id },
                            }}
                          >
                            View
                          </Link>
                          <div className="divider divider-horizontal"></div>
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: "/pig_management/worker/Remove",
                              query: { id: item.pig_id },
                            }}
                          >
                            Remove
                          </Link>
                        </div>
                      </td> */}
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
