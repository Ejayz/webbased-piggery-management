"use client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CancelRestock } from "@/hooks/useStockCard";

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
    "StockCardList",
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/Restock/${page}/?&filter=${JSON.stringify(
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
    refetch();
  }, [filter.sortby, filter.sortorder]);
  useEffect(() => {
    if (filter.keyword == "") {
      refetch();
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
            Stock Card List
          </p>
        </div>

        <div className="w-full h-auto flex flex-col">
          <div className="w-11/12 mx-auto flex-col  flex gap-2 lg:flex-row my-2 text-base-content">
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
          </div>
          <div className="overflow-x-auto ">
            <table className="table  w-11/12  mx-auto  text-center text-base-content">
              <thead>
                <tr>
                  <th></th>
                  <th>Restock Date</th>
                  <th>Reciept</th>
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
                    console.log(item);
                    return (
                      <tr key={key} className="hover">
                        <th>{key + 1}</th>
                        <td>{}</td>
                        <td>
                          <Link
                            href={`https://webbasedpiggeryuploaded.sgp1.cdn.digitaloceanspaces.com/${item.attachment}`}
                          >
                            Download
                          </Link>
                        </td>
                        <td className="flex">
                          <div className="flex flex-row mx-auto">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={async () => {
                                if (
                                  !confirm(
                                    "Are you sure you want to cancel this restock? This will destock items in stock card."
                                  )
                                ) {
                                  return;
                                } else {
                                  const returned = await CancelRestock(
                                    item.restock_id
                                  );
                                  if (returned.code == 200) {
                                    toast.success("Restock cancelled");
                                    refetch();
                                  } else {
                                    toast.error("Something went wrong");
                                  }
                                }
                              }}
                            >
                              <Image
                                src="/assets/table/remove.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              Cancel Restock
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
