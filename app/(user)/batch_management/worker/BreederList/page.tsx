"use client";
import Table from "@/components/TableBody/Table";
import { getData, Search, sortData } from "@/hooks/usePigManagement";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

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
  const router = useRouter();

  const { error, isLoading, isFetching, data, refetch } = useQuery(
    "cage",
    async () => {
      let headersList = {
        Accept: "*/*",
      };
      let response = await fetch(
        `${
          location.origin
        }/api/get/BatchManagement/Breeder/${page}/?&filters=${JSON.stringify(
          filter
        )}`,
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
  const processQrCode = async (index: number, id: string) => {
    let data: any = document.getElementById(`${id}`);
    let download: any = data.toDataURL();
    const link = document.createElement("a");
    link.href = download;
    link.download = `${id}.png`;
    link.target = "_blank";
    link.click();
    link.remove();
  };
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
                <div className="mr-auto ml-8">
                  <button
                    className="btn"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mx-auto w-11/12">
            <table className="table table-compact w-11/12  mx-auto  text-base-content">
              <thead>
                <tr>
                  <th></th>
                  <th>Batch Name</th>
                  <th>Total Pig</th>
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
                        <th className="hidden">
                          <QRCodeCanvas
                            id={item.batch_id}
                            value={JSON.stringify({
                              batch_id: item.batch_id,
                              batch_name: item.batch_name,
                              batch_capacity: item.batch_capacity,
                            })}
                          />
                        </th>
                        <td>{item.batch_name}</td>
                        <td>{item.batch_capacity}</td>
                        <td className="flex">
                          <div className="flex flex-row ">
                            {/* <Link
                              className="btn btn-sm btn-warning mx-2"
                              href={{
                                pathname: "/pig_management/worker/View",
                                query: { id: item.pig_id },
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
                            </Link> */}
                            <Link
                              className="btn btn-sm btn-primary mx-2"
                              href={{
                                pathname: `/batch_management/worker/BreederList/View/${item.batch_id}`,
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
                            <Link
                              className="btn btn-sm btn-warning mx-2"
                              href={{
                                pathname: `/batch_management/worker/BreederList/Move/${item.batch_id}`,
                              }}
                            >
                              <Image
                                src="/assets/icons/move.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              Move Cage
                            </Link>
                            <button
                              className="btn btn-info btn-sm mx-2"
                              type="button"
                              onClick={() => {
                                processQrCode(key, item.batch_id);
                              }}
                            >
                              <Image
                                src="/assets/icons/qrcode.svg"
                                height={520}
                                width={520}
                                alt={""}
                                className="mx-auto w-6 h-6"
                              ></Image>
                              Download
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
