"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
    "STOCKcARD",
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
              <option value="item_name">Item Name</option>
              <option value="item_description">Item Description</option>
              <option value="category_name">Category Name</option>
              <option value="item_left">Total Stocks Available</option>
              <option value="item_unit">Item Unit</option>
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
          <table className="table table-compact w-11/12  mx-auto  text-center text-base-content">
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Category Name</th>
                <th>Total Stocks Available</th>
                <th>Item Unit</th>
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
                      <td>{item.item_left}</td>
                      <td>{item.item_unit}</td>
                      <td className="flex">
                        <div className="flex flex-row mx-auto">
                          <Link
                            className="btn btn-sm btn-primary"
                            href={{
                              pathname: `/StockCard/worker/Destock/${item.item_id}`,
                            }}
                          >
                            <svg
                              height={24}
                              width={24}
                              fill="#000000"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                <path d="M3.61289944,6.20970461 L3.70710678,6.29289322 L10,12.585 L13.2928932,9.29289322 C13.6533772,8.93240926 14.2206082,8.90467972 14.6128994,9.20970461 L14.7071068,9.29289322 L19,13.585 L20.2928932,12.2928932 C20.8954683,11.6903181 21.9071808,12.0723323 21.9940167,12.8863691 L22,13 L21.9982503,17.0593845 L21.9982503,17.0593845 L21.989279,17.1469496 L21.989279,17.1469496 L21.964279,17.2658396 L21.964279,17.2658396 L21.9401054,17.3416665 L21.9401054,17.3416665 L21.9063266,17.4232215 L21.9063266,17.4232215 L21.8540045,17.5207088 L21.8540045,17.5207088 L21.7870723,17.6170223 L21.7870723,17.6170223 L21.7070891,17.7071408 L21.7070891,17.7071408 C21.6717127,17.7425008 21.6343256,17.774687 21.5953066,17.8036654 L21.4840621,17.8753288 L21.4840621,17.8753288 L21.371336,17.9287745 L21.371336,17.9287745 L21.265993,17.9641549 L21.265993,17.9641549 L21.1484669,17.9889822 L21.1484669,17.9889822 L21.0892501,17.9960336 L21,18 L17,18 C16.1478301,18 15.7025662,17.0144864 16.2167748,16.3774732 L16.2928932,16.2928932 L17.585,15 L14,11.415 L10.7071068,14.7071068 C10.3466228,15.0675907 9.77939176,15.0953203 9.38710056,14.7902954 L9.29289322,14.7071068 L2.29289322,7.70710678 C1.90236893,7.31658249 1.90236893,6.68341751 2.29289322,6.29289322 C2.65337718,5.93240926 3.22060824,5.90467972 3.61289944,6.20970461 Z"></path>{" "}
                              </g>
                            </svg>
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
