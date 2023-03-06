"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useCageManagement";
import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { toast } from "react-toastify";
import {
  validateNormal,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
} from "@/hooks/useValidation";
import PasswordBox from "@/components/FormComponents/passwordBox";
import { GetCages, IdGenerator } from "@/hooks/usePigManagement";
import QrCode from "@/components/QrComponent/qrcode";

interface CageList {
  value: number;
  display: string;
  disabled: boolean;
}

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [pig_id, setPigId] = useState("1");
  const [cage_id, setCageId] = useState("default");
  const [batch_id, setBatchId] = useState(1);
  const [pig_tag, setPigTag] = useState("");
  const [pig_type, setPigType] = useState("default");
  const [birth_date, setBirthDate] = useState("");
  const [Weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");

  const [isPigId, setIsPigId] = useState(true);
  const [isCageId, setIsCageId] = useState(true);
  const [isBatchId, setIsBatchId] = useState(true);
  const [isPigTag, setIsPigTag] = useState(true);
  const [isPigType, setIsPigType] = useState(true);
  const [isBirthDate, setIsBirthDate] = useState(true);
  const [isWeight, setIsWeight] = useState(true);
  const [isUnit, setIsUnit] = useState(true);

  const [cageList, setCageList] = useState<CageList[]>([]);

  const [hideScanner, setHideScanner] = useState(false);
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (loading.data.job == "owner" || loading.data.job == "veterinarian") {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);

  function resetState() {
    setReset(!reset);
  }
  useEffect(() => {
    async function readyData() {
      const returned = await IdGenerator();
      const cage_list: any = await GetCages();
      if (cage_list.code == 200) {
        cage_list.data.map((data: any, key: any) => {
          cageList.push({
            value: data.cage_id,
            display: data.cage_name,
            disabled: false,
          });
        });
        console.log(cageList);
      }

      setPigId(returned);
    }
    readyData();
  }, []);

  const validate = async (e: any) => {
    e.preventDefault();
    if (true) {
      toast.error("All feilds are required.");
      return false;
    }

    if (!true) {
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }

    if (!confirm("Are you sure you want to create?")) {
      return false;
    }
  };

  if (loading.loading) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <input
          type="checkbox"
          id="my-modal-6"
          checked={hideScanner}
          onChange={() => {
            setHideScanner(!hideScanner);
          }}
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-base-content">
              Use custom Qr Code
            </h3>
            <QrCode
              setter={setPigId}
              setHide={setHideScanner}
              hide={hideScanner}
            ></QrCode>
            <div className="modal-action">
              <button
                onClick={() => {
                  setHideScanner(false);
                }}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-base-100 h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage Pig
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Pig</li>
                    <li className="font-bold">Create</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4">
                    <div className="">
                      <InputBox
                        type={"text"}
                        label={"Pig Id"}
                        placeholder={"Pig Id"}
                        name={"Pig Id"}
                        disabled={false}
                        className={"input input-bordered h-8"}
                        getter={pig_id}
                        setter={setPigId}
                        required={true}
                        validation={validateNormal}
                        setIsValid={setIsPigId}
                        reset={reset}
                        readonly={true}
                      />
                      <button
                        type="button"
                        className={" bg-primary  text-primary-content btn"}
                        onClick={() => {
                          setHideScanner(true);
                        }}
                      >
                        Scan QR CODE
                      </button>
                    </div>
                    <SelectBox
                      label={"Cage"}
                      name={"Cage"}
                      selected={cage_id}
                      options={cageList}
                      disabled={false}
                      default_option={"Select Cage"}
                      setter={setCageId}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsCageId}
                      reset={reset}
                    />
                    <InputBox
                      type={"text"}
                      label={"Batch Number"}
                      placeholder={"Batch Number"}
                      name={"BatchNumber"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={batch_id}
                      setter={setBatchId}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsBatchId}
                      reset={reset}
                      readonly={true}
                    />{" "}
                    <InputBox
                      type={"text"}
                      label={"Pig Tag"}
                      placeholder={"Pig Tag"}
                      name={"PigTag"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={pig_tag}
                      setter={setPigTag}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsPigTag}
                      reset={reset}
                      readonly={false}
                    />
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4">
                    <SelectBox
                      label={"Pig Type"}
                      name={"pig_Type"}
                      selected={pig_type}
                      options={[
                        {
                          value: "Gilt",
                          display: "Gilt",
                          disabled: false,
                        },
                        {
                          value: "Sow",
                          display: "Sow",
                          disabled: false,
                        },
                        {
                          value: "Piglet",
                          display: "Piglet",
                          disabled: false,
                        },
                        {
                          value: "Boar",
                          display: "Boar",
                          disabled: false,
                        },
                        {
                          value: "Fattening",
                          display: "Fattening",
                          disabled: false,
                        },
                      ]}
                      disabled={false}
                      default_option={"Select Pig Type"}
                      setter={setPigType}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsPigType}
                      reset={reset}
                    />{" "}
                    <InputBox
                      type={"date"}
                      label={"Birth Date"}
                      placeholder={"Pig Birth Date"}
                      name={"birthdate"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={birth_date}
                      setter={setBirthDate}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsBirthDate}
                      reset={reset}
                      readonly={false}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-active btn-primary mx-4">
                      Create
                    </button>
                    <button
                      type="reset"
                      onClick={resetState}
                      className="btn mx-4"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
