"use client";
import { useReducer, useState } from "react";
import { toast } from "react-toastify";
import InputBox from "../FormComponents/inputbox";
import SelectBox from "../FormComponents/selectBox";
import { AddCage, getData } from "@/hooks/useCageManagement";
import NextDropDown from "../FormComponents/NextDropDown";
import NextInput from "../FormComponents/NextInput";
import Loading from "@/components/Loading/loading";
export default function Add({ sortby, sorts, setParsed, setisSorting }: any) {
  const [fetching, setFetching] = useState(false);
  const [pig_id, setPigId] = useState("");
  const [cage_id, setCageId] = useState("");
  const [batch_id, setBatchId] = useState("");
  const [breed_id, setBreedId] = useState("");
  const [pig_tag, setPigTag] = useState("");
  const [pig_type, setPigType] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [cage_list, setCageList] = useState([]);
  const [batch_list, setBatchList] = useState([]);
  const [breed_list, setBreedList] = useState([]);
  function resetState() {}

  const cage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (1 == 1) {
      toast.error("All feilds are required");
      return false;
    }
    if (!confirm("Create new cage?")) {
      return false;
    }
    exec_add();
  };

  const exec_add = async () => {};
  if (fetching) {
    return (
      <>
        <Loading height="1/2"></Loading>
      </>
    );
  }
  return (
    <>
      <div className="w-full bg-slate-500 h-11/12 flex flex-col">
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
          <div className="w-full h-auto py-4 ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3">
            <NextInput type="text" label="Pig Tag"></NextInput>
          </div>
          <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1"></div>
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
