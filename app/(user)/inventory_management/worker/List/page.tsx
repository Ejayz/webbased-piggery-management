"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
  const [parsed, setParsed] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    sortby: "item_name",
    sortorder: "asc",
    keyword: "",
  });
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");

  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "InventoryList",
    async () => {
      const response = await fetch(
        `${
          location.origin
        }/api/get/InventoryManagement/${page}/?&filter=${JSON.stringify(
          filter
        )}`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
    if (page !== 1) {
      setPage(1);
    } else {
      refetch();
    }
  }, [filter.sortby, filter.sortorder]);
  useEffect(() => {
    if (filter.keyword == "") {
      if (page !== 1) {
        setPage(1);
      } else {
        refetch();
      }
    }
  }, [filter.keyword]);
  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            Inventory List
          </p>
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
              <option value="item_name">Item Name</option>
              <option value="item_description">Item Description</option>
              <option value="category_name">Category Name</option>
              <option value="total_stocks">Total Stocks Available</option>
              <option value="item_unit">Item Unit</option>
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
                    className="input  input-bordered my-auto"
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
          <div className="overflow-x-auto w-11/12 mx-auto">
            <table className="table table-compact w-11/12  mx-auto  text-base-content">
              <thead>
                <tr>
                  <th></th>
                  <th>Item Name</th>
                  <th>Item Description</th>
                  <th>Category Name</th>
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
                        <td>{item.item_name}</td>
                        <td>{item.item_description}</td>
                        <td>{item.category_name}</td>
                        <td className="flex">
                          <div className="flex flex-row gap-2">
                            <Link
                              className="btn btn-sm btn-warning"
                              href={{
                                pathname: "/inventory_management/worker/Update",
                                query: { id: item.item_id },
                              }}
                            >
                              <Image
                                src="/assets/table/edit.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-2 w-6 h-6"
                              ></Image>
                              Update
                            </Link>
                            <Link
                              className="btn btn-sm btn-primary"
                              href={{
                                pathname: "/inventory_management/worker/View",
                                query: { id: item.item_id },
                              }}
                            >
                              <Image
                                src="/assets/table/view.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-2 w-6 h-6"
                              ></Image>
                              View
                            </Link>
                            <Link
                              className="btn btn-sm btn-error"
                              href={{
                                pathname: "/inventory_management/worker/Remove",
                                query: { id: item.item_id },
                              }}
                            >
                              <Image
                                src="/assets/table/remove.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-2 w-6 h-6"
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
