"use client";

import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { useQuery } from "react-query";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: any) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    ["batch_data", params.ID !== undefined],
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/BatchManagement/getBatchDetails/${params.ID}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {}
  );
  if (isFetching || isLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            {data.data.batch_details[0].batch_name} List
          </p>
        </div>

        <div className="w-full h-auto flex flex-col"></div>
        <div className="overflow-x-auto mx-auto w-11/12 flex flex-col">
          <table className="table table-compact w-11/12  mx-auto  text-base-content">
            <thead>
              <tr>
                <th></th>
                <th>Pig Id</th>
                <th>Weight</th>
                <th>Cage Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    Please wait while we fetch the data
                  </td>
                </tr>
              ) : data.data.pig_details.length != 0 ? (
                data.data.pig_details.map((item: any, key: number) => {
                  return (
                    <tr key={key} className="hover">
                      <th>{key + 1}</th>
                      <td>{item.pig_id}</td>
                      <td>{`${item.weight} kg`} </td>
                      <td>{item.cage_name}</td>
                      <td>{item.status}</td>
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
          <div className="justify-content ml-auto my-4">
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
    );
  }
}
