"use client";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import { getData, UpdateCage, ViewCage } from "@/hooks/useCageManagement";
import Loading from "../Loading/loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
export default function Edit({ sortby, sorts, setParsed, setisSorting }: any) {
  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState();
  const router = useRouter();
  const QueryId = useSearchParams().get("id");
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

  function callCancel(e?: any) {
    router.push("/manage_cage/worker?action=a&id=null");
  }

  useEffect(() => {
    async function start() {
      setCageName("");
      const returned = await ViewCage(QueryId);
      if (returned.code == 200) {
        setCageName(returned.data.cage_name);
        setCageCapacity(returned.data.cage_capacity);
        setCageType(returned.data.cage_type);
        setCageId(returned.data.cage_id);
      } else {
        toast.error(returned.message);
      }
    }
    if (QueryId != "null") {
      start();
    }
  }, [QueryId]);

  if (cage_name == "") {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full bg-slate-500 h-11/12 flex flex-col">
          <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
            <ul>
              <li>Cage Management</li>
              <li className="font-bold">View</li>
            </ul>
          </div>
          <form method="post" className="flex w-full h-auto py-2 flex-col">
            <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
              <InputBox
                type={"text"}
                label={"Cage Name"}
                placeholder={"Cage Name"}
                name={"cagename"}
                disabled={true}
                className={"input input-bordered h-8"}
                value={cage_name}
                setter={setCageName}
                required={false}
              />
              <InputBox
                type={"number"}
                label={"Cage Capacity"}
                placeholder={"Cage Capacity"}
                name={"cagecapacity"}
                disabled={true}
                className={"input input-bordered h-10"}
                value={cage_capacity}
                setter={setCageCapacity}
                required={true}
              />{" "}
            </div>
            <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
              <SelectBox
                label={"Cage Type"}
                name={"cage_type"}
                selected={cage_type}
                disabled={true}
                default_option={"Cage Type"}
                options={[
                  {
                    value: "Individual Stall",
                    display: "Individual Stall",
                  },
                  {
                    value: "Group Housing",
                    display: "Group Housing",
                  },
                  {
                    value: "Forrowing Crates",
                    display: "Forrowing Crates",
                  },
                  {
                    value: "Sow Stall",
                    display: "Sow Stall",
                  },
                  {
                    value: "Grow Finishing Housing",
                    display: "Grow Finishing Housing",
                  },
                  {
                    value: "Nursery Pen",
                    display: "Nursery Pen",
                  },
                  {
                    value: "Quarantine Cage",
                    display: "Quarantine Cage",
                  },
                ]}
                setter={setCageType}
                required={true}
              ></SelectBox>
            </div>
            <div className="w-full mt-2 mb-2 ml-2">
              <Link
                onClick={(e) => {
                  callCancel(e);
                }}
                className="btn btn-active btn-primary mx-4"
                href={"/manage_cage/worker?action=a&id=null"}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}
