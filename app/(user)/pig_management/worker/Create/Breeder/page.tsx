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
import BreederDataForms from "@/components/PigDataForms/breederDataForms";
import { DateTime } from "luxon";

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
  breed_id: string;
  pig_type: string;
}

interface BatchData {
  batch_id: string;
  batch_name: string;
  arrival_date: string;
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
      batch_id: "",
      pig_tag: "",
      pig_type: "",
      birth_date: "",
      weight: "",
      breed_id: "",
      batch_name: "",
    },
    mode: "onChange",
    criteriaMode: "all",
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const { isLoading, error, data, refetch, isFetching } = useQuery(
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
  const [pigData, setPigData] = useState<PigData[]>([]);
  const [batchData, setBatchData] = useState<BatchData>();

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
  const [resset, setResset] = useState(false);

  const {
    isLoading: FormInfo,
    error: ErrorFormInfo,
    data: DataFormInfo,
    refetch: RefetchFormInfo,
  } = useQuery(
    "formDetails",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/getFormDetail`
      );

      const data = await response.json();
      const breed_list = data.data.BreedList;
      const batchid = data.data.LatestBatchId;
      const boarlist = data.data.BoarList;
      const sowlist = data.data.SowList;
      let listBoar: any = [];
      let listSow: any = [];
      let listBreed: any = [];

      breed_list.map((data: any, key: any) => {
        listBreed.push({
          value: data.breed_id,
          display: data.breed_name,
          disabled: false,
        });
      });
      setValue("batch_id", batchid[0].batch_id + 1);
      setValue("batch_name", `Batch ${batchid[0].batch_id + 1}`);
      sowlist.map((data: any, key: number) => {
        listSow.push({
          value: data.pig_id,
          display: data.pig_id,
          disabled: false,
        });
      });
      boarlist.map((data: any, key: number) => {
        listBoar.push({
          value: data.pig_id,
          display: data.pig_id,
          disabled: false,
        });
      });
      setValue("birth_date", DateTime.now().setZone("Asia/Manila").toISODate());
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
      batch_id: "",
      pig_tag: "",
      pig_type: "",
      birth_date: new Date().toISOString().substr(0, 10 || ""),
      weight: "",
      breed_id: "",
    });
    refetch();
    RefetchFormInfo();
  }

  const exec_create = async () => {
    const returned = await Create(
      watch("batch_id"),
      watch("batch_name"),
      pigData,
      watch("birth_date")
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

  const onSubmit = () => {
    setProcessing(true);
    if (!confirm("Create pig?")) {
      setProcessing(false);
      return false;
    }
    exec_create();
  };

  if (loading.loading) {
    return loading.loader;
  } else if (isLoading || isFetching) {
    return <Loading></Loading>;
  } else if (!allowed) {
    return loading.loader;
  } else {
    return (
      <>
        <div className="w-full  h-full oveflow-y-scroll flex flex-col overflow-x-hidden">
          <div className=" h-auto w-full">
            <div className="w-11/12  mx-auto flex flex-row">
              <p className="text-2xl text-base-content my-auto p-4">
                Manage Pig
              </p>
            </div>

            <div className=" w-11/12 mx-auto  text-base-content  ">
              <div className="">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Pig</li>
                    <li>Create</li>
                    <li className="font-bold">Breeder</li>
                  </ul>
                </div>

                <div className="flex w-full h-auto py-2 flex-col">
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4 gap-2">
                    <NormalInput
                      name={"batch_name"}
                      label={"Batch Name"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      readonly={true}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                  </div>
                  <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4 gap-2">
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
                      readonly={true}
                    ></NormalInput>
                  </div>
                  <div className="divider text-2xl uppercase">Breeder Data</div>
                  {isLoading || isFetching ? (
                    <Loading></Loading>
                  ) : (
                    <BreederDataForms
                      pigData={pigData}
                      setPigData={setPigData}
                      clear={reset}
                      setResset={setResset}
                      batch_num={watch("batch_id")}
                    ></BreederDataForms>
                  )}
                  <div className="card-actions justify-end mt-6">
                    <button
                      onClick={() => {
                        if (pigData.length > 0) {
                          onSubmit();
                        } else {
                          toast.error("Please add breeder data");
                        }
                      }}
                      type="button"
                      className={`btn btn-active btn-success mx-4 ${
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
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
