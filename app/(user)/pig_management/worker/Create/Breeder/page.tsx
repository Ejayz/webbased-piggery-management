"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { toast } from "react-toastify";
import {
  validateNormal,
  validateNumber,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
} from "@/hooks/useValidation";
import PasswordBox from "@/components/FormComponents/passwordBox";
import {
  Create,
  getBreedList,
  GetCages,
  IdGenerator,
} from "@/hooks/usePigManagement";
import QrCode from "@/components/QrComponent/qrcode";
import QRCode from "react-qr-code";
import Link from "next/link";
import printJS from "print-js";
import { QRCodeCanvas } from "qrcode.react";

interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
}

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [pig_id, setPigId] = useState("");
  const [cage_id, setCageId] = useState("default");
  const [batch_id, setBatchId] = useState("1");
  const [pig_tag, setPigTag] = useState("");
  const [pig_type, setPigType] = useState("default");
  const [birth_date, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [breed_id, setBreed] = useState("default");

  const [isBreed, setIsBreed] = useState(true);
  const [isPigId, setIsPigId] = useState(true);
  const [isCageId, setIsCageId] = useState(true);
  const [isBatchId, setIsBatchId] = useState(true);
  const [isPigTag, setIsPigTag] = useState(true);
  const [isPigType, setIsPigType] = useState(true);
  const [isBirthDate, setIsBirthDate] = useState(true);
  const [isWeight, setIsWeight] = useState(true);

  const qrCodeContainer = useRef<any>();

  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [breedList, setBreedList] = useState<SelectInter[]>([]);
  const [scannerLink, setScannerLink] = useState<any>("");
  const [hideScanner, setHideScanner] = useState(false);
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [processing, setProcessing] = useState(false);
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

  async function resetState() {
    setReset(true);
    const returned = await IdGenerator();
    setPigId(returned);
    setCageId("default");
    setPigTag("");
    setPigType("default");
    setBirthDate("");
    setWeight("");
    setBreed("default");
    setCageList([]);
    setBreedList([]);
    setReset(false);
  }
  useEffect(() => {
    async function readyData() {
      const returned = await IdGenerator();
      const cage_list: any = await GetCages();
      const breed_list: any = await getBreedList();
      if (cage_list.code == 200) {
        cage_list.data.map((data: any, key: any) => {
          cageList.push({
            value: data.cage_id,
            display: data.cage_name,
            disabled: false,
          });
        });
      }
      if (breed_list.code == 200) {
        breed_list.data.map((data: any, key: any) => {
          breedList.push({
            value: data.breed_id,
            display: data.breed_name,
            disabled: false,
          });
        });
      }
      setPigId(returned);
    }
    readyData();
  }, []);

  const createDownloadLink = async () => {
    let data: any = document.getElementById("canvasable");
    setScannerLink(data.toDataURL());
  };

  useEffect(() => {
    if (pig_id != "") {
      createDownloadLink();
    }
  }, [pig_id]);
  const validate = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    if (
      pig_id == "" ||
      cage_id == "default" ||
      batch_id == "" ||
      pig_tag == "" ||
      pig_type == "default" ||
      birth_date == ""
    ) {
      setProcessing(false);
      toast.error("All feilds are required.");
      return false;
    }

    if (
      !(
        isPigId &&
        isCageId &&
        isBatchId &&
        isPigTag &&
        isPigType &&
        isBirthDate &&
        isWeight
      )
    ) {
      setProcessing(false);
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }

    if (!confirm("Are you sure you want to create?")) {
      setProcessing(false);
      return false;
    }
    exec_create();
  };

  const exec_create = async () => {
    const returned = await Create(
      pig_id,
      cage_id,
      batch_id,
      breed_id,
      pig_tag,
      pig_type,
      birth_date,
      weight
    );
    if (returned.code == 200) {
      setProcessing(false);
      toast.success(returned.message);
      resetState();
    } else {
      setProcessing(false);
      toast.error(returned.message);
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
                    <li>Create</li>
                    <li className="font-bold">Breeder</li>
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
                    />
                    <SelectBox
                      label={"Breed"}
                      name={"Breed"}
                      selected={breed_id}
                      options={breedList}
                      disabled={false}
                      default_option={"Select Breed"}
                      setter={setBreed}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsBreed}
                      reset={reset}
                    />
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4">
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
                    <SelectBox
                      label={"Pig Type"}
                      name={"pig_Type"}
                      selected={pig_type}
                      options={[
                        {
                          value: "Sow",
                          display: "Sow",
                          disabled: false,
                        },

                        {
                          value: "Boar",
                          display: "Boar",
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
                    />{" "}
                    <InputBox
                      type={"number"}
                      label={"Weight"}
                      placeholder={"Pig Weight"}
                      name={"weight"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={weight}
                      setter={setWeight}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsWeight}
                      reset={reset}
                      readonly={false}
                    />
                  </div>
                  <div className="flex flex-row " ref={qrCodeContainer}>
                    <div className="w-1/4 h-1/4 ">
                      <span className="label text-base font-bold text-base-content">
                        Qr Code
                      </span>
                      <QRCodeCanvas id="canvasable" value={pig_id} />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        className="my-auto btn btn-primary"
                        download={`${pig_id}.png`}
                        target="_blank"
                        href={scannerLink}
                      >
                        Download
                      </Link>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          printJS("canvasable", "html");
                        }}
                        type="button"
                      >
                        Print
                      </button>
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        processing ? "loading" : ""
                      }`}
                    >
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
