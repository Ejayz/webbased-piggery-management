"use client";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import NormalInput from "../FormCompsV2/NormalInput";
import SelectInput from "../FormCompsV2/SelectInput";
import QrCode from "../QrComponent/qrcodeObj";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
  max?: string;
  current_capacity?: any;
}
export default function GeneralPigBatch({
  setBatchData,
  setShowPigData,
  showPigData,
  clear,
  setBatchId,
}: any) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      batch_id: "",
      boar_id: "",
      sow_id: "",
      pig_type: "",
      birth_date: "",
      breed_id: "",
      batch_name: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { isLoading, error, data, refetch } = useQuery(
    "formDetails",
    async () => {
      setBreedList([]);
      setSowList([]);
      setBoarList([]);

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
      setBatchId(batchid[0].batch_id + 1);
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

      setBoarList(listBoar);
      setSowList(listSow);
      setBreedList(listBreed);
      setValue("birth_date", DateTime.now().setZone("Asia/Manila").toISODate());
    },
    {
      cacheTime: 0,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  const [boarList, setBoarList] = useState<SelectInter[]>([]);
  const [sowList, setSowList] = useState<SelectInter[]>([]);
  const [breedList, setBreedList] = useState<SelectInter[]>([]);
  const [hideScanner, setHideScanner] = useState({
    hide: false,
    type: "boar_id",
  });

  const batch_id = watch("batch_id");
  console.log(hideScanner);
  useEffect(() => {
    refetch();
  }, []);
  function resetState() {
    reset();
    refetch();
  }
  useEffect(() => {
    if (clear) {
      reset();
      refetch();
      setShowPigData(false);
    }
  }, [clear]);
  const onSubmit = (data: any) => {
    setShowPigData(true);
    setBatchData(data);
  };

  return (
    <>
      {" "}
      <input
        type="checkbox"
        id="scannerSow"
        checked={hideScanner.hide}
        onChange={() => {
          setHideScanner({
            hide: !hideScanner.hide,
            type: hideScanner.type,
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
            setter={setValue}
            setHide={setHideScanner}
            hide={hideScanner}
            ActionMaker={hideScanner.type}
          ></QrCode>

          <div className="modal-action">
            <button
              onClick={() => {
                setHideScanner({
                  hide: !hideScanner.hide,
                  type: hideScanner.type,
                });
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="flex w-full h-auto py-2 flex-col"
      >
        <div className="w-full ml-2 grid lg:grid-cols-4 lg:grid-rows-none grid-cols-none grid-rows-4 gap-2">
          <NormalInput
            type={"text"}
            label={"Batch Name"}
            name={"batch_name"}
            required={true}
            register={register}
            errors={errors}
            readonly={true}
            validationSchema={{
              required: "This field is required",
            }}
          />
          <div className="flex flex-row">
            <SelectInput
              name={"sow_id"}
              label={"Sow"}
              register={register}
              errors={errors}
              required={true}
              options={sowList}
              validationSchema={{
                required: "This field is required",
              }}
            />
            <button
              onClick={() => {
                setHideScanner({
                  hide: true,
                  type: "sow_id",
                });
              }}
              type="button"
              className="btn btn-small mb-0 mt-auto"
            >
              Scan Sow
            </button>
          </div>
          <div className="flex flex-row">
            <SelectInput
              name={"boar_id"}
              label={"Boar"}
              register={register}
              errors={errors}
              required={true}
              options={boarList}
              validationSchema={{
                required: "This field is required",
              }}
            />{" "}
            <button
              onClick={() => {
                setHideScanner({
                  hide: true,
                  type: "boar_id",
                });
              }}
              type="button"
              className="btn btn-small mt-auto mb-0"
            >
              Scan Boar
            </button>
          </div>
          <SelectInput
            name={"breed_id"}
            label={"breed"}
            register={register}
            errors={errors}
            required={true}
            options={breedList}
            validationSchema={{
              required: "This field is required",
            }}
          />

          <NormalInput
            type={"date"}
            label={"Birth Date"}
            name={"birth_date"}
            required={true}
            register={register}
            readonly={true}
            errors={errors}
            validationSchema={{
              required: "This field is required",
            }}
          />
        </div>

        <div
          className={`card-actions justify-end ${showPigData ? "hidden" : ""}`}
        >
          <button className={`btn btn-active btn-info mx-4`}>Next</button>
          <button type="button" onClick={resetState} className="btn mx-4">
            Clear
          </button>
        </div>
      </form>
    </>
  );
}
