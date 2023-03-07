"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  CreatePigs,
  GetBatchId,
  GetBoarList,
  getBreedList,
  GetCages,
  GetNurseryCage,
  GetSowList,
  IdGenerator,
} from "@/hooks/usePigManagement";
import { QRCodeCanvas } from "qrcode.react";
import printJS from "print-js";
import QrCode from "@/components/QrComponent/qrcodeArrayState";
import Loading from "@/components/Loading/loading";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
  max?: string;
  current_capacity?: any;
}
interface PigData {
  pig_id: string;
  cage_id: string;
  pig_tag: string;
  weight: string;
  error: boolean;
}
export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [pigData, setPigData] = useState<PigData[]>([]);

  const [batch_id, setBatchId] = useState("1");
  const [boar_id, setBoardId] = useState("default");
  const [sow_id, setSowId] = useState("default");
  const [pig_type, setPigType] = useState("default");
  const [birth_date, setBirthDate] = useState(new Date());
  const [breed_id, setBreed] = useState("default");
  const [batch_name, setBatchName] = useState("");

  const [isBatchName, setIsBatchName] = useState(true);
  const [isBreed, setIsBreed] = useState(true);
  const [isPigType, setIsPigType] = useState(true);
  const [isBirthDate, setIsBirthDate] = useState(true);
  const [isBoar, setIsBoar] = useState(true);
  const [isSow, setIsSow] = useState();

  const qrCodeContainer = useRef<any>();

  const [boarList, setBoarList] = useState<SelectInter[]>([]);
  const [sowList, setSowList] = useState<SelectInter[]>([]);
  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [breedList, setBreedList] = useState<SelectInter[]>([]);
  const [hideScanner, setHideScanner] = useState({ show: false, index: 0 });
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  const [processing, setProcessing] = useState(false);
  const [doneRender, setDoneRender] = useState(false);
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

  useEffect(() => {
    async function readyData() {
      const cage_list: any = await GetNurseryCage();
      const breed_list: any = await getBreedList();
      const batchid: any = await GetBatchId();
      const boarlist: any = await GetBoarList();
      const sowlist: any = await GetSowList();
      if (cage_list.code == 200) {
        cage_list.data.map((data: any, key: any) => {
          cageList.push({
            value: data.cage_id,
            display: data.cage_name,
            disabled: false,
            max: data.cage_capacity,
            current_capacity: data.current_caged,
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
      if (batchid.code == 200) {
        setBatchId(batchid.id + 1);
        setBatchName(`Batch ${batchid.id + 1}`);
      }
      if (sowlist.code == 200) {
        sowlist.data.map((data: any, key: number) => {
          sowList.push({
            value: data.pig_id,
            display: data.pig_id,
            disabled: false,
          });
        });
      }
      if (boarlist.code == 200) {
        boarlist.data.map((data: any, key: number) => {
          setBoarList((prevData) => [
            ...prevData,
            {
              value: data.pig_id,
              display: data.pig_id,
              disabled: false,
            },
          ]);
        });
      }
    }
    readyData().then(() => {
      setDoneRender(true);
    });
  }, []);

  const idSetter = async () => {
    return await IdGenerator();
  };

  const createRow = async () => {
    let pig_id = await idSetter();
    setPigData((prevData) => [
      ...prevData,
      {
        pig_id: pig_id,
        cage_id: "",
        pig_tag: "",
        weight: "",
        error: false,
      },
    ]);
  };

  function updateCageCurrentCapacityAdd(id: string): void {
    setCageList((CageData) => {
      const updatedCageList = [...CageData];
      updatedCageList.map((value: any, key: number) => {
        if (value.value == id) {
          updatedCageList[key].current_capacity =
            parseInt(value.current_capacity) + 1;
          return;
        }
      });
      return updatedCageList;
    });
  }
  function updateCageCurrentCapacitySubtract(id: string): void {
    setCageList((CageData) => {
      const updatedCageList = [...CageData];
      updatedCageList.map((value: any, key: number) => {
        if (value.value == id) {
          updatedCageList[key].current_capacity =
            parseInt(value.current_capacity) - 1;
          return;
        }
      });
      return updatedCageList;
    });
  }

  const processQrCode = async (index: number, id: string) => {
    let data: any = document.getElementById(`${id}`);
    console.log(data);
    let download: any = data.toDataURL();
    const link = document.createElement("a");
    link.href = download;
    link.download = `${id}.png`;
    link.target = "_blank";
    link.click();
    link.remove();
  };
  function resetState() {
    setReset(!reset);
    setPigData([]);
    setBoardId("default");
    setSowId("default");
    setPigType("default");
    setBirthDate(new Date());
    setBreed("default");
    setBatchName(`Batch ${batch_id}`);
  }
  function updatePigIdAtIndex(index: number, pigId: string): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].pig_id = pigId;
      return updatedPigData;
    });
  }
  function updateErrorAtIndex(index: number): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].error = true;
      return updatedPigData;
    });
  }
  function updateCageIdAtIndex(index: number, cageId: string): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].cage_id = cageId;
      return updatedPigData;
    });
  }

  function updatePigTagAtIndex(index: number, pigTag: string): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].pig_tag = pigTag;
      return updatedPigData;
    });
  }
  function updateWeightAtIndex(index: number, weight: string): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].weight = weight;
      return updatedPigData;
    });
  }
  function removePigDataAtIndex(index: number): void {
    if (confirm("Are you sure you want to remove this row?")) {
      setPigData((prevPigData) => {
        const updatedPigData = [...prevPigData];
        updatedPigData.splice(index, 1);
        return updatedPigData;
      });
    }
  }
  const validate = async (e: any) => {
    e.preventDefault();
    setProcessing(true);
    if (
      batch_name == "" ||
      sow_id == "default" ||
      boar_id == "" ||
      breed_id == "" ||
      pig_type == "default"
    ) {
      toast.error("All fields are required");
      setProcessing(false);
      return false;
    }
    pigData.forEach((value, index) => {
      if (
        value.cage_id == "default" ||
        value.pig_tag == "" ||
        value.weight == ""
      ) {
        updateErrorAtIndex(index);
        toast.error(
          "There are errors in your form. Please review and correct the row(s) created  before submitting."
        );
        setProcessing(false);
        return false;
      }
    });

    if (!(isBoar || isBreed || isSow)) {
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      setProcessing(false);
      return false;
    }
    if (pigData.length == 0) {
      toast.error("Pig detail list is empty.");
      setProcessing(false);
      return false;
    }
    if (!confirm("Are you sure you want to create?")) {
      setProcessing(false);
      return false;
    }
    exec_create();
  };

  const exec_create = async () => {
    const returned = await CreatePigs(
      batch_id,
      boar_id,
      sow_id,
      pig_type,
      birth_date,
      breed_id,
      pigData,
      batch_name
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
      setProcessing(false);
    } else {
      setProcessing(false);
      toast.error(returned.error);
    }
  };

  if (loading.loading) {
    return loading.loader;
  }
  if (!doneRender) {
    return loading.loader;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <input
          type="checkbox"
          id="my-modal-6"
          checked={hideScanner.show}
          onChange={() => {
            setHideScanner({
              show: !hideScanner.show,
              index: 0,
            });
          }}
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-base-content">
              Use custom Qr Code
            </h3>
            <QrCode
              setter={updatePigIdAtIndex}
              setHide={setHideScanner}
              index={hideScanner.index}
              hide={hideScanner}
            ></QrCode>
            <div className="modal-action">
              <button
                onClick={() => {
                  setHideScanner({
                    show: false,
                    index: 0,
                  });
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
              className="card w-11/12 mx-auto h-auto bg-base-200 text-base-content shadow-xl "
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
                    <InputBox
                      type={"text"}
                      label={"Batch Name"}
                      placeholder={"Batch Name"}
                      name={"BatchName"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={batch_name}
                      setter={setBatchName}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsBatchName}
                      reset={reset}
                      readonly={true}
                    />
                    <SelectBox
                      label={"Sow"}
                      name={"Sow Id"}
                      selected={sow_id}
                      options={sowList}
                      disabled={false}
                      default_option={"Select Sow"}
                      setter={setSowId}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsSow}
                      reset={reset}
                    />
                    <SelectBox
                      label={"Boar"}
                      name={"Boar"}
                      selected={boar_id}
                      options={boarList}
                      disabled={false}
                      default_option={"Select Boar"}
                      setter={setBoardId}
                      required={true}
                      className={`input input-bordered h-10  `}
                      validation={validateSelect}
                      setIsValid={setIsBoar}
                      reset={reset}
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
                    <SelectBox
                      label={"Pig Type"}
                      name={"pig_Type"}
                      selected={pig_type}
                      options={[
                        {
                          value: "Piglet",
                          display: "Piglet",
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
                    />
                    <InputBox
                      type={"date"}
                      label={"Birth Date"}
                      placeholder={"Pig Birth Date"}
                      name={"birthdate"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={birth_date.toISOString().substr(0, 10)}
                      setter={setBirthDate}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsBirthDate}
                      reset={reset}
                      readonly={true}
                    />
                  </div>{" "}
                  <button
                    type="button"
                    onClick={() => {
                      createRow();
                    }}
                    className="btn btn-primary my-2 w-1/4"
                  >
                    New Pig
                  </button>
                  <div className="overflow-x-auto h-auto">
                    <span></span>
                    <table className="table table-compact w-full h-auto">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Pig Id</th>
                          <th>Cage Name*</th>
                          <th>Pig Tag*</th>
                          <th>Weight*</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pigData.map((value: PigData, key: number) => {
                          console.log(value.error);
                          return (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <th className="hidden">
                                <QRCodeCanvas
                                  id={value.pig_id}
                                  value={value.pig_id}
                                />
                              </th>
                              <th>{value.pig_id}</th>
                              <td>
                                <select
                                  required={true}
                                  key={key}
                                  value={value.cage_id}
                                  className={`select w-full max-w-xs select-sm ${
                                    value.cage_id == "" ? "select-error" : ""
                                  }`}
                                  onChange={(e) => {
                                    if (value.cage_id == "") {
                                      updateCageCurrentCapacityAdd(
                                        e.target.value
                                      );
                                      updateCageIdAtIndex(key, e.target.value);
                                    } else if (
                                      value.cage_id != e.target.value
                                    ) {
                                      updateCageCurrentCapacitySubtract(
                                        value.cage_id
                                      );
                                      updateCageCurrentCapacityAdd(
                                        e.target.value
                                      );
                                      updateCageIdAtIndex(key, e.target.value);
                                    } else {
                                      updateCageCurrentCapacityAdd(
                                        e.target.value
                                      );
                                      updateCageIdAtIndex(key, e.target.value);
                                    }
                                  }}
                                >
                                  <option value="">Cage Name</option>
                                  {cageList.map((cage: any, key: number) => {
                                    return (
                                      <option
                                        key={key}
                                        disabled={
                                          cage.max == cage.current_capacity
                                        }
                                        value={cage.value}
                                      >
                                        {cage.display}
                                      </option>
                                    );
                                  })}
                                </select>
                              </td>
                              <td>
                                <input
                                  required={true}
                                  type="text"
                                  placeholder="Pig Tag"
                                  className={`input input-sm w-full max-w-xs ${
                                    value.pig_tag == "" ? "input-error" : ""
                                  }`}
                                  value={value.pig_tag}
                                  onChange={(e) => {
                                    updatePigTagAtIndex(key, e.target.value);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  required={true}
                                  type="text"
                                  placeholder="Weight"
                                  className={`input input-sm w-full max-w-xs ${
                                    value.weight == "" ? "input-error" : ""
                                  }`}
                                  value={value.weight}
                                  onChange={(e) => {
                                    updateWeightAtIndex(key, e.target.value);
                                  }}
                                />
                              </td>
                              <td className="grid my-auto md:grid-cols-2 grid-cols-none grid-rows-4 md:grid-rows-none  gap-2">
                                <div className="dropdown">
                                  <label tabIndex={0} className="btn m-1">
                                    Options
                                  </label>
                                  <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                  >
                                    <li>
                                      <button
                                        type="button"
                                        className="link"
                                        onClick={() => {
                                          setHideScanner({
                                            show: true,
                                            index: key,
                                          });
                                        }}
                                      >
                                        Custom QrCode
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        type="button"
                                        className="link"
                                        onClick={() => {
                                          processQrCode(key, value.pig_id);
                                        }}
                                      >
                                        Download QrCode
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        type="button"
                                        className="link"
                                        onClick={() => {
                                          printJS(`${value.pig_id}`, "html");
                                        }}
                                      >
                                        Print Qr Code
                                      </button>
                                    </li>
                                  </ul>
                                </div>

                                <button
                                  type="button"
                                  className="link"
                                  onClick={() => {
                                    removePigDataAtIndex(key);
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot
                        className={`${pigData.length !== 5 ? "hidden" : ""}`}
                      >
                        <tr>
                          <th></th>
                          <th>Pig Id</th>
                          <th>Cage Name*</th>
                          <th>Pig Tag*</th>
                          <th>Weight*</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
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
