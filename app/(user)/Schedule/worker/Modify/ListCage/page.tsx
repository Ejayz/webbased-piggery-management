"use client";

import FeedingActivity from "@/components/OperationComponents/Cage/FeedingActivity/FeedingActivity";
import MedicineAdministration from "@/components/OperationComponents/Cage/Medicine_Administration/Medicine_Administration";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            {tab == 0
              ? "Feeding Operation Calendar"
              : " Medicine Administration Operation Calendar"}
          </p>
        </div>
        <div className="w-full h-full flex flex-row text-base-content">
          <div className="w-11/12 mx-auto flex h-auto flex-col">
            <div className="tabs mb-4">
              <button
                onClick={() => {
                  setTab(0);
                }}
                className={`tab tab-bordered ${tab == 0 ? "tab-active" : ""}`}
              >
                Feeding
              </button>
              <button
                onClick={() => {
                  setTab(1);
                }}
                className={`tab tab-bordered ${tab == 1 ? "tab-active" : ""}`}
              >
                Medicine Administration
              </button>
            </div>
            {tab == 0 ? (
              <FeedingActivity />
            ) : tab == 1 ? (
              <MedicineAdministration />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
