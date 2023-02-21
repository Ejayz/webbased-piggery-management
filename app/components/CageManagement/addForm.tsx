"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import { AddCage, getData } from "@/hooks/useCageManagement";
export default function AddUser({
  sortby,
  sorts,
  setParsed,
  setisSorting,
  setPage,
}: any) {
  const [cage_name, setCageName] = useState("");
  const [cage_type, setCageType] = useState("default");
  const [cage_capacity, setCageCapacity] = useState<number | string>("");
  function resetState() {
    setCageName("");
    setCageCapacity("");
    setCageType("default");
  }

  const cage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      cage_name == "" ||
      cage_type == "default" ||
      cage_capacity == 0 ||
      cage_capacity == ""
    ) {
      toast.error("All feilds are required");
      return false;
    }
    if (!confirm("Create new cage?")) {
      return false;
    }
    exec_add();
  };

  const exec_add = async () => {
    const returned = await AddCage(cage_name, cage_capacity, cage_type);
    if (returned.code == 200) {
      toast.success(returned.message);
      setisSorting(true);
      const getPage = await getData(1, sortby, sorts, "");
      if (getPage.code == 200) {
        setisSorting(false);
        setPage(1);
        setParsed(getPage.data);
      }
      resetState();
    } else {
      toast.error(returned.message);
    }
  };

  return (
    <>
      <div className="w-full bg-slate-500 rounded-lg h-11/12 flex flex-col">
        <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
          <ul>
            <li>Cage Management</li>
            <li className="font-bold">Add</li>
          </ul>
        </div>{" "}
        <form
          method="post"
          onSubmit={cage}
          className="flex w-full h-auto py-2 flex-col"
        >
          <div className="w-full ml-2 grid lg:grid-cols-2 lg:grid-rows-none grid-cols-none grid-rows-2">
            <InputBox
              type={"text"}
              label={"Cage Name"}
              placeholder={"Cage Name"}
              name={"cagename"}
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
            <button className="btn btn-active btn-primary mx-4">Create</button>
            <button
              type="reset"
              onClick={resetState}
              className="btn btn-active btn-primary mx-4"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
