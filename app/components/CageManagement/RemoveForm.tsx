"use client";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import {
  getData,
  RemoveCage,
  UpdateCage,
  ViewCage,
} from "@/hooks/useCageManagement";
import Loading from "../Loading/loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
export default function Remove({
  sortby,
  sorts,
  setParsed,
  setisSorting,
  setPage,
}: any) {
  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  const [cage_id, setCageId] = useState(1);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

  function callCancel(e?: any) {
    router.push("/manage_cage/worker?action=a&id=null");
  }

  const verifyAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cage_name == "" || cage_capacity == "" || cage_type == "default") {
      toast.error("All feilds are required.");
      return false;
    }
    if (confirm("Are you sure you want to remove?")) {
      exec_remove();
    }
  };

  const exec_remove = async () => {
    const returned = await RemoveCage(cage_id);
    if (returned.code == 200) {
      toast.success(returned.message);
      setisSorting(true);
      const getPage = await getData(1, sortby, sorts, "");
      if (getPage.code == 200) {
        setisSorting(false);
        setPage(1);
        setParsed(getPage.data);
        callCancel();
      }
      resetState();
    } else {
      toast.error(returned.message);
    }
  };

  useEffect(() => {
    async function start() {
      setCageName("");
      const returned = await ViewCage(Queryid);
      if (returned.code == 200) {
        setCageName(returned.data[0].cage_name);
        setCageCapacity(returned.data[0].cage_capacity);
        setCageType(returned.data[0].cage_type);
        setCageId(returned.data[0].cage_id);
      } else {
        toast.error(returned.message);
      }
    }
    if (Queryid !== null || Queryid !== undefined) {
      start();
    }
  }, [Queryid]);

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
        <div className="w-full bg-slate-500 rounded-lg h-11/12 flex flex-col">
          <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
            <ul>
              <li>Cage Management</li>
              <li>View</li>
              <li className="font-bold">Remove</li>
            </ul>
          </div>
          <form
            method="post"
            onSubmit={verifyAction}
            className="flex w-full h-auto py-2 flex-col"
          >
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
                    disabled: false,
                  },
                  {
                    value: "Group Housing",
                    display: "Group Housing",
                    disabled: false,
                  },
                  {
                    value: "Forrowing Crates",
                    display: "Forrowing Crates",
                    disabled: false,
                  },
                  {
                    value: "Sow Stall",
                    display: "Sow Stall",
                    disabled: false,
                  },
                  {
                    value: "Grow Finishing Housing",
                    display: "Grow Finishing Housing",
                    disabled: false,
                  },
                  {
                    value: "Nursery Pen",
                    display: "Nursery Pen",
                    disabled: false,
                  },
                  {
                    value: "Quarantine Cage",
                    display: "Quarantine Cage",
                    disabled: false,
                  },
                ]}
                setter={setCageType}
                required={true}
              ></SelectBox>
            </div>
            <div className="w-full mt-2 mb-2 ml-2">
              <button className="btn btn-active btn-primary mx-4">
                Remove
              </button>
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
