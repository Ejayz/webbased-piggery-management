"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { toast } from "react-toastify";
import { Create, IdGenerator } from "@/hooks/usePigManagement";
import QrCode from "@/components/QrComponent/qrcode";
import Link from "next/link";
import printJS from "print-js";
import { QRCodeCanvas } from "qrcode.react";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import { useQuery, useQueryClient } from "react-query";
import Loading from "@/components/Loading/loading";

interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
}

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pig_id: "",
      cage_id: "",
      batch_id: "1",
      pig_tag: "",
      pig_type: "",
      birth_date: "",
      weight: "",
      breed_id: "",
    },
    mode: "onChange",
    criteriaMode: "all",
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const { isLoading, error, data, refetch } = useQuery(
    "pigBreederForm",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/getBreederFormDetail`
      );
      return response.json();
    },
    {
      cacheTime: 0,
    }
  );

  const pig_id = watch("pig_id");
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
  let cageLister: SelectInter[] = [];
  let breedLister: SelectInter[] = [];
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
    reset({
      pig_id: "",
      cage_id: "",
      batch_id: "1",
      pig_tag: "",
      pig_type: "",
      birth_date: "",
      weight: "",
      breed_id: "",
    });
    refetch();
    const returned = await IdGenerator();
    setValue("pig_id", returned);
    setValue("batch_id", "1");
  }
  console.log(data);

  useEffect(() => {
    async function readyData() {
      cageLister = [];
      breedLister = [];
      if (data !== undefined || data != undefined) {
        if (data.code == 200) {
          const returned = await IdGenerator();

          data.data.CageList.map((data: any, key: any) => {
            cageLister.push({
              value: data.cage_id,
              display: data.cage_name,
              disabled: false,
            });
          });

          data.data.BreedList.map((data: any, key: any) => {
            breedLister.push({
              value: data.breed_id,
              display: data.breed_name,
              disabled: false,
            });
          });
          setCageList(cageLister);
          setBreedList(breedLister);
          setValue("pig_id", returned);
          setValue("batch_id", "1");
        }
      }
    }
    readyData();
  }, [data]);
  useEffect(() => {
    console.log(isLoading);
    if (isLoading) {
      setCageList([]);
      setBreedList([]);
    }
  }, [isLoading]);
  const createDownloadLink = async () => {
    let data: any = document.getElementById("canvasable");
    setScannerLink(data.toDataURL());
  };

  useEffect(() => {
    if (pig_id != "") {
      createDownloadLink();
    }
  }, [pig_id]);

  const exec_create = async (data: any) => {
    const returned = await Create(
      data.pig_id,
      data.cage_id,
      data.batch_id,
      data.breed_id,
      data.pig_tag,
      data.pig_type,
      data.birth_date,
      data.weight
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

  const onSubmit = (data: any) => {
    setProcessing(true);
    if (!confirm("Create pig?")) {
      setProcessing(false);
      return false;
    }
    exec_create(data);
  };

  if (loading.loading) {
    return loading.loader;
  } else if (isLoading) {
    return <Loading></Loading>;
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
              setter={setValue}
              setHide={setHideScanner}
              hide={hideScanner}
              ActionMaker={"pig_id"}
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
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4 gap-2">
                    <div className="">
                      <NormalInput
                        name={"pig_id"}
                        label={"Pig Id"}
                        register={register}
                        errors={errors}
                        required={true}
                        type={"text"}
                        readonly={true}
                        validationSchema={{
                          required: "This field is required",
                        }}
                      ></NormalInput>
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
                    <SelectInput
                      name="cage_id"
                      label={"Cage"}
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                      options={cageList}
                    ></SelectInput>

                    <NormalInput
                      name={"batch_id"}
                      label={"Batch Number"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      readonly={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                    <SelectInput
                      name="breed_id"
                      label={"Breed"}
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                      options={breedList}
                    ></SelectInput>
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4 gap-2">
                    <NormalInput
                      name={"pig_tag"}
                      label={"Pig Tag"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      validationSchema={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      }}
                    ></NormalInput>
                    <SelectInput
                      name="pig_type"
                      label={"Pig Type"}
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
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
                    ></SelectInput>
                    <NormalInput
                      name={"birth_date"}
                      label={"Arrival Date"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"date"}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                    <NormalInput
                      name={"weight"}
                      label={"Weight"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"number"}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
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
                  <div className="card-actions justify-end mt-6">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        processing ? "loading" : ""
                      }`}
                    >
                      Create
                    </button>
                    <button
                      type="button"
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
