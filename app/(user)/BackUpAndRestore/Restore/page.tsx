"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function Page() {
  const [processing, setProcessing] = useState(false);
  return (
    <>
      <div className=" h-auto w-full">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">
            Manage Back Up and Restore
          </p>
        </div>
      </div>
      <div className=" mx-auto text-base-content w-11/12 ">
        <div className="">
          <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
            <ul>
              <li>Back Up and Restore</li>
              <li>Restore</li>
            </ul>
          </div>
          <form
            onSubmit={async (e: any) => {
              e.preventDefault();

              if (e.target.sql_file.files.length == 0) {
                toast.error("Please select a file");
                return;
              } else if (e.target.sql_file.files[0].size > 10000000) {
                toast.error("File size should be less than 10MB");
                return;
              }
              setProcessing(true);
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              };

              let bodyContent = new FormData();
              bodyContent.append("sql_file", e.target.sql_file.files[0]);

              let response = await fetch("/api/post/restore", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
              });

              let data = await response.json();
              if (data.code == 200) {
                toast.success(data.message);
                setProcessing(false);
              } else {
                toast.error(data.message);
                setProcessing(false);
              }
            }}
            method="post"
            className="flex w-full h-auto py-2 flex-col"
          >
            <input
              type="file"
              name="sql_file"
              className="file-input w-full max-w-xs mt-2 mb-2"
              placeholder="Select File"
              accept=".sql*"
            />
            <button
              className={`btn btn-active btn-primary w-1/4 ${
                processing ? "loading" : ""
              }`}
            >
              Restore
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
