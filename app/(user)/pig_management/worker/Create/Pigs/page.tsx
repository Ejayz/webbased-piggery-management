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
  GetBatchId,
  getBreedList,
  GetCages,
  IdGenerator,
} from "@/hooks/usePigManagement";
import { QRCodeCanvas } from "qrcode.react";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
}
interface PigData {
  pig_id: string;
  cage_id: string;
  pig_tag: string;
  weight: string;
  downloadableLink: string;
}
export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [pigData, setPigData] = useState<PigData[]>([]);

  const [batch_id, setBatchId] = useState("1");

  const [pig_type, setPigType] = useState("default");
  const [birth_date, setBirthDate] = useState(new Date());
  const [breed_id, setBreed] = useState("default");
  const [batch_name, setBatchName] = useState("");

  const [isBatchName, setIsBatchName] = useState(true);
  const [isBreed, setIsBreed] = useState(true);
  const [isPigId, setIsPigId] = useState(true);
  const [isCageId, setIsCageId] = useState(true);
  const [isBatchId, setIsBatchId] = useState(true);
  const [isPigTag, setIsPigTag] = useState(true);
  const [isPigType, setIsPigType] = useState(true);
  const [isBirthDate, setIsBirthDate] = useState(true);
  const [isWeight, setIsWeight] = useState(true);

  const qrCodeContainer = useRef<any>();

  const [doneRender, setDoneRender] = useState(false);
  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [breedList, setBreedList] = useState<SelectInter[]>([]);
  const [scannerLink, setScannerLink] = useState<any>("");
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

  useEffect(() => {
    async function readyData() {
      const cage_list: any = await GetCages();
      const breed_list: any = await getBreedList();
      const batchid: any = await GetBatchId();
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
      if (batchid.code == 200) {
        setBatchId(batchid.id + 1);
        setBatchName(`Batch ${batchid.id + 1}`);
      }
    }
    readyData();
  }, [reset]);

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
        downloadableLink: "",
      },
    ]);
    console.log(pig_id);
  };

  function updatePigDataDownloadableLinkAtIndex(
    index: number,
    downloadableLink: string
  ): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      const updatedPig = { ...updatedPigData[index], downloadableLink };
      updatedPigData[index] = updatedPig;
      return updatedPigData;
    });
  }
  const processQrCode = async (index: number, id: string) => {
    let data: any = document.getElementById(`${id}`);
    console.log(data);
    let download: any = data.toDataURL();
    // create a new link element
    const link = document.createElement("a");

    // set the link href and text
    link.href = download;
    link.download = `${id}.png`;
    link.target = "_blank";

    // simulate a click event on the link
    link.click();
    link.remove();
  };
  function resetState() {
    setReset(!reset);
  }
  function updatePigIdAtIndex(index: number, pigId: string): void {
    setPigData((prevPigData) => {
      const updatedPigData = [...prevPigData];
      updatedPigData[index].pig_id = pigId;
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
                  </div>
                  <div className="overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => {
                        createRow();
                      }}
                      className="btn btn-primary"
                    >
                      New Pig
                    </button>
                    <table className="table table-compact w-full">
                      <thead>
                        <tr>
                          <th>Pig Id</th>
                          <th>Cage Name</th>
                          <th>Pig Tag</th>
                          <th>Weight</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pigData.map((value: PigData, key: number) => {
                          return (
                            <tr key={key}>
                              <th>
                                {" "}
                                <QRCodeCanvas
                                  id={value.pig_id}
                                  value={value.pig_id}
                                />
                              </th>
                              <th>{value.pig_id}</th>
                              <td></td>
                              <td>Quality Control Specialist</td>
                              <td>Littel, Schaden and Vandervort</td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    processQrCode(key, value.pig_id);
                                  }}
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
