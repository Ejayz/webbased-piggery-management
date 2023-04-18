"use client";

import Loading from "@/components/Loading/loading";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
  const [rendered, isRendered] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      isRendered(true);
    }
  }, []);

  const { data, isFetching, error } = useQuery("getDashboard", async () => {
    const res = await fetch("/api/get/Dashboard/getDashboardData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  });

  if (!rendered) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex flex-col h-auto ">
        <div className="stats shadow my-2  w-11/12 mx-auto">
          <div className="stat place-items-center">
            <div className="stat-title">Sow</div>
            <div className={`stat-value ${isFetching ? "loading" : ""}`}>
              {isFetching ? "..." : data.data.sows}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Boar</div>
            <div className="stat-value text-secondary">
              {isFetching ? "..." : data.data.boars}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Piglets</div>
            <div className="stat-value">
              {isFetching ? "..." : data.data.piglets}
            </div>
          </div>
        </div>
        <div className="stats shadow my-2 w-11/12 mx-auto">
          <div className="stat place-items-center">
            <div className="stat-title">Total Feeds</div>
            <div className="stat-value">
              {isFetching ? "..." : `${data.data.totalFeed} Kg`}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Operation</div>
            <div className="stat-value text-secondary">
              {isFetching ? "..." : data.data.totalOperation}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Quarantined</div>
            <div className="stat-value">
              {isFetching ? "..." : data.data.totalQuarantine}
            </div>
          </div>
        </div>
        <div className="stats shadow my-2 w-11/12 mx-auto">
          <div className="stat place-items-center">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-secondary">
              {isFetching ? "..." : data.data.totalUser}
            </div>
          </div>
        </div>
        <div className="alert shadow-lg w-11/12 mx-auto">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Currently there are{" "}
              {isFetching ? "..." : data.data.totalPendingOperation} pending
              operation today.
            </span>
          </div>
        </div>
        <div className="alert alert-warning shadow-lg w-11/12 mx-auto my-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Warning: There are {isFetching ? "..." : data.data.totalLowLvl}{" "}
              item(s) . Please check Reorder List Report to generate the list of
              item.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
