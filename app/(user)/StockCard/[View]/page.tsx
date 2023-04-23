"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import luxon, { DateTime } from "luxon";
export default function Page({ params }: any) {
  console.log(params);
  const [parsed, setParsed] = useState<any[]>([]);
  const [StockCardFilter, setStockCardFilterFilter] = useState({
    sortby: "stock_card_id",
    sortorder: "desc",
    keyword: "",
    stock_id: params.View,
  });
  const [stockCardPage, setStockCardPage] = useState(0);
  const [page, setPage] = useState(1);
  const msg = useSearchParams().get("msg");
  const status = useSearchParams().get("status");
  const [filter, setFilter] = useState({
    sortby: "type",
    sortorder: "asc",
    keyword: "",
    stock_card_id: params.View,
  });
  const {
    error: StockCardError,
    isLoading: StockCardDataisLoading,
    isFetching: StockCardIsFetching,
    data: StockCardData,
    refetch: StockCardRefetch,
  } = useQuery(
    "StockCardData",
    async () => {
      const response = await fetch(
        `${
          location.origin
        }/api/get/StockCard/${stockCardPage}/?&filter=${JSON.stringify(
          StockCardFilter
        )}`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {}
  );
  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "stockCardDetails",
    async () => {
      const response = await fetch(
        `${
          location.origin
        }/api/get/StockCardDetails/${page}/?&filter=${JSON.stringify(filter)}`
      );
      const data = await response.json();
      data.time = new Date().getTime() / 1000;
      return data;
    },
    {}
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
    if (filter.stock_card_id !== "") {
      refetch();
    }
  }, [filter.sortby]);
  useEffect(() => {
    if (filter.stock_card_id !== "") {
      refetch();
    }
  }, [filter.sortorder]);
  useEffect(() => {
    if (filter.keyword == "" && filter.stock_card_id !== "") {
      refetch();
    }
  }, [filter.keyword]);

  useEffect(() => {
    if (filter.stock_card_id !== "") {
      refetch();
    }
  }, [page]);

  useEffect(() => {
    setStockCardFilterFilter({ ...StockCardFilter, stock_id: params.View });
  }, [params.View]);

  useEffect(() => {
    if (filter.stock_card_id !== "" && StockCardFilter.stock_id !== "") {
      StockCardRefetch();
    }
  }, [StockCardFilter.stock_id]);

  useEffect(() => {
    if (StockCardData != undefined) {
      if (StockCardData.data) {
        setFilter({
          ...filter,
          stock_card_id: StockCardData.data[0].stock_card_id,
        });
      }
    }
  }, [StockCardData]);

  useEffect(() => {
    if (filter.stock_card_id !== "") {
      refetch();
    }
  }, [filter.stock_card_id]);

  useEffect(() => {
    if (StockCardFilter.stock_id != "") {
      StockCardRefetch();
    }
  }, [stockCardPage]);

  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            Stock Card Detail
          </p>
        </div>

        <div className="w-11/12 mx-auto h-auto flex flex-row">
          <div className="flex">
            <button
              onClick={() => {
                if (stockCardPage !== 0) {
                  setStockCardPage(stockCardPage - 1);
                }
              }}
              className="my-auto"
            >
              <svg
                className="w-10 h-10"
                width="256px"
                height="256px"
                viewBox="-2 -2 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          {StockCardData?.data != undefined ? (
            <div className="w-11/12  my-auto ">
              <div className="w-11/12 mx-auto">
                <h2 className="card-title text-base-content">
                  Stock Card #
                  {StockCardData?.data != undefined
                    ? StockCardData.data[0].stock_card_id
                    : "undefined"}
                </h2>
                <div className="text-base-content ">
                  <div className="flex flex-row">
                    <span className="font-semibold">Date:</span>
                    <span>
                      {StockCardData?.data != undefined
                        ? DateTime.fromISO(
                            StockCardData.data[0].transaction_date
                          )
                            .setZone("Asia/Manila")
                            .toFormat("EEEE',' MMM d',' yyyy")
                        : "Undifined"}
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-semibold">Stock Opening:</span>
                    <span className="uppercase">
                      {StockCardData?.data != undefined
                        ? (
                            StockCardData.data[0].opening_quantity /
                            StockCardData.data[0].item_net_weight
                          ).toFixed(2)
                        : "Undifined"}{" "}
                      {StockCardData.data[0].item_unit}
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-semibold">Stock Closing:</span>
                    <span className="uppercase">
                      {StockCardData?.data != undefined
                        ? (
                            StockCardData.data[0].closing_quantity /
                            StockCardData.data[0].item_net_weight
                          ).toFixed(2)
                        : "Undifined"}{" "}
                      {StockCardData.data[0].item_unit}
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-semibold  ">Item Name:</span>
                    <span>
                      {" "}
                      {StockCardData?.data != undefined
                        ? StockCardData.data[0].item_name
                        : "Undifined"}
                    </span>
                  </div>
                </div>
                <div className="w-8/12 mx-auto flex lg:flex-row my-2 text-base-content flex-col gap-2">
                  <span className="uppercase text-xl font-bold my-auto">
                    Filters:
                  </span>
                  <select
                    className="select select-bordered my-auto w-auto  text-base-content mx-2"
                    onChange={(e) => {
                      setFilter({ ...filter, sortorder: e.target.value });
                    }}
                    value={filter.sortorder}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                  <select
                    className="select select-bordered my-auto w-auto text-base-content mx-2"
                    onChange={(e) => {
                      setFilter({ ...filter, sortby: e.target.value });
                    }}
                    value={filter.sortby}
                  >
                    <option value="type">Type</option>
                    <option value="transaction_quantity">
                      Transaction Quantity
                    </option>
                    <option value="total_quantity">Total Quantity</option>
                    <option value="expiration_date">Expiration Date</option>
                    <option value="remark">Remarks</option>
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
                <div className="overflow-x-auto w-11/12 mx-auto">
                  <table className="table table-compact w-11/12  mx-auto text-base-content">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Type</th>
                        <th>Transaction Quantity</th>
                        <th>Total Quantity</th>
                        <th>Expiration Date</th>
                        <th>Remarks</th>
                        <th>Attachments</th>
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
                              <td>{item.type}</td>
                              <td className="uppercase">
                                {(
                                  parseFloat(item.transaction_quantity) /
                                  parseFloat(
                                    StockCardData.data[0].item_net_weight
                                  )
                                ).toFixed(2)}
                                {` ${StockCardData.data[0].item_unit}`}
                              </td>
                              <td className="uppercase">
                                {(
                                  parseFloat(item.total_quantity) /
                                  parseFloat(
                                    StockCardData.data[0].item_net_weight
                                  )
                                ).toFixed(2)}
                                {` ${StockCardData.data[0].item_unit}`}
                              </td>
                              <td className="uppercase">
                                {item.expiration_date == null
                                  ? "N/A"
                                  : DateTime.fromISO(
                                      item.expiration_date
                                    ).toFormat("EEEE',' MMM d',' yyyy")}
                              </td>
                              <td>
                                {item.remark == null ? "N/A" : item.remark}
                              </td>
                              <td>
                                {item.attachment == null ? (
                                  "N/A"
                                ) : (
                                  <Link
                                    className="link underline"
                                    href={`https://webbasedpiggeryuploaded.sgp1.digitaloceanspaces.com/${item.attachment}`}
                                  >
                                    Attachment
                                  </Link>
                                )}
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
          ) : StockCardDataisLoading || StockCardIsFetching ? (
            <div className=" w-11/12  mx-auto flex ">
              <h1 className="text-base-content text-2xl font-bold mx-auto my-auto">
                Please wait while we fetch more stock card...
              </h1>
            </div>
          ) : (
            <div className=" w-11/12  mx-auto flex">
              <h1 className="text-base-content text-2xl font-bold mx-auto my-auto">
                NO MORE STOCK CARD TO DISPLAY
              </h1>
            </div>
          )}
          <div className="flex">
            <button
              onClick={() => {
                StockCardData?.data == undefined
                  ? ""
                  : setStockCardPage(stockCardPage + 1);
              }}
              className="my-auto"
            >
              <svg
                className="w-10 ml-auto mr-0 h-10"
                width="256px"
                height="256px"
                viewBox="-2 -2 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
