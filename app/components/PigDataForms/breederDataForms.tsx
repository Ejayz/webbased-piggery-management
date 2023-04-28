"use client";
import { IdGenerator } from "@/hooks/usePigManagement";
import Link from "next/link";
import printJS from "print-js";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import NormalInput from "../FormCompsV2/NormalInput";
import SelectInput from "../FormCompsV2/SelectInput";
import QrCode from "../QrComponent/qrcode";
interface SelectInter {
  value: number;
  display: string;
  disabled: boolean;
  max?: string;
  current_capacity?: any;
}
interface cageSelect {
  value: number;
  display: string;
  disabled: boolean;
  max: string;
  current_capacity: any;
}
interface SelectedCage {
  cage_id: string;
  selected_quantity: number;
}
export default function ({
  pigData,
  setPigData,
  clear,
  setResset,
  batch_num,
}: any) {
  const [cageList, setCageList] = useState<cageSelect[]>([]);
  const [cageSelected, setCageSelected] = useState<SelectedCage[]>([]);
  const [hideScanner, setHideScanner] = useState(false);
  const [breedList, setBreedList] = useState<SelectInter[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      pig_id: "",
      pig_tag: "",
      weight: "",
      cage_id: "",
      breed_id: "",
      pig_type: "",
      cage_name: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const {
    data: breedData,
    isLoading: breedLoading,
    error: breedError,
    refetch: breedRefetch,
  } = useQuery(
    "breedData",
    async () => {
      const response = await fetch(
        `/api/post/PigManagement/getBreederFormDetail`
      );
      const data = await response.json();
      console.log("getBreederFormDetails", data);
      return data;
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setBreedList([]);
    if (breedData) {
      if (breedData.code == 200) {
        let list: SelectInter[] = [];
        breedData.data.BreedList.map((item: any) => {
          list.push({
            value: item.breed_id,
            display: item.breed_name,
            disabled: false,
          });
        });
        setBreedList(list);
        let cageList: cageSelect[] = [];
        breedData.data.CageList.map((item: any) => {
          cageList.push({
            value: item.cage_id,
            display: item.cage_name,
            disabled: false,
            max: item.cage_capacity,
            current_capacity: item.current_caged,
          });
          setCageList(cageList);
        });
      }
    }
  }, [breedData]);

  useEffect(() => {
    async function generate() {
      breedRefetch();
      const returned = await IdGenerator(`Breeder${pigData.length}`, batch_num);
      setValue("pig_id", returned);
    }
    generate();
  }, []);
  const resetState = async () => {
    reset();
  };

  const addSelectedQuantity = async (id: string) => {
    setCageSelected((prevState) => {
      const updated = prevState.map((cage) => {
        if (cage.cage_id == id) {
          return { ...cage, selected_quantity: cage.selected_quantity + 1 };
        }

        return cage;
      });
      return updated;
    });
  };

  const processQrCode = async (index: number, id: string) => {
    let data: any = document.getElementById(`${id}`);
    let download: any = data.toDataURL();
    const link = document.createElement("a");
    link.href = download;
    link.download = `${id}.png`;
    link.target = "_blank";
    link.click();
    link.remove();
  };

  const subtractSelectedQuantity = async (id: string) => {
    setCageSelected((prevState) => {
      const updated = prevState.map((cage) => {
        if (cage.cage_id == id) {
          return { ...cage, selected_quantity: cage.selected_quantity - 1 };
        }
        return cage;
      });
      return updated;
    });
  };

  const addSelected = async (id: string, current: number) => {
    cageSelected.push({ cage_id: id, selected_quantity: current + 1 });
  };

  const checkIsExist = async (cage_id: any) => {
    let exist = false;

    return exist;
  };

  const getCageDetails = async (cage_id: any) => {
    let current = 0;
    cageList.map((value) => {
      if (value.value == cage_id) {
        current = value.current_capacity;
      }
    });
    return current;
  };

  useEffect(() => {
    if (clear) {
      reset();
      setResset(false);
      setPigData([]);
    }
  }, [clear]);
  useEffect(() => {
    async function generate() {
      const returned = await IdGenerator(`Breeder${pigData.length}`, batch_num);
      setValue("pig_id", returned);
    }
    generate();
  }, [pigData]);

  const removePig = (index: any) => {
    const updated = [...pigData];
    const id = cageList.findIndex(
      (value: any) => value.value == pigData[index].cage_id
    );
    const updatedList = { ...cageList[id], disabled: false };
    cageList[id] = updatedList;
    console.log("cageList", cageList);
    updated.splice(index, 1);
    setPigData(updated);
  };

  const onSubmit = async (data: any) => {
    setPigData([
      ...pigData,
      {
        pig_id: watch("pig_id"),
        cage_id: watch("cage_id"),
        breed_id: watch("breed_id"),
        pig_type: watch("pig_type"),
        pig_tag: watch("pig_tag"),
        weight: watch("weight"),
        cage_name: cageList.find(
          (value: any) => value.value == watch("cage_id")
        )?.display,
      },
    ]);
    const id = cageList.findIndex(
      (value: any) => value.value == watch("cage_id")
    );
    let updatedList: any = {};

    if (cageList[id].current_capacity + 1 <= cageList[id].max) {
      updatedList = { ...cageList[id], disabled: true };
    } else {
      updatedList = {
        ...cageList[id],
        current_capacity: cageList[id].current_capacity + 1,
      };
    }
    console.log(cageList);
    cageList[id] = updatedList;
    reset();
  };

  const evaluateCreateCage = () => {
    let result = 0;
    cageList.forEach((value) => {
      if (!value.disabled) {
        result++;
      }
    });
    return result;
  };

  return (
    <div className="w-full h-auto overflow-y-hidden">
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
                setHideScanner(!hideScanner);
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <span></span>
      {evaluateCreateCage() == 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              No cage listed ? Create individual cage on{" "}
              <Link className="underline" href="/cage_management/worker/Create">
                Cage Management Module
              </Link>
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
      {breedList.length <= 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              No breed listed ? Create pig breed on{" "}
              <Link
                className="underline"
                href="/breed_management/worker/Create"
              >
                Breed Management Module
              </Link>
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 grid-cols-2 grid-rows-2 grid">
          <div className="flex flex-row">
            <NormalInput
              type={"text"}
              label={"Pig Id"}
              name={`pig_id`}
              required={true}
              register={register}
              errors={errors}
              validationSchema={{
                required: "This field is required",
              }}
              id={"pig_tag"}
              readonly={true}
            />
            <button
              type="button"
              className={" text-primary-content btn mt-auto mx-2"}
              onClick={() => {
                setHideScanner(true);
              }}
            >
              Scan QR CODE
            </button>
          </div>
          <SelectInput
            name={`cage_id`}
            label={"Cage"}
            register={register}
            errors={errors}
            required={true}
            options={cageList}
            validationSchema={{
              required: "This is required",
            }}
            id={"cage_id"}
          />{" "}
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
            type={"text"}
            label={"Pig Tag"}
            name={`pig_tag`}
            required={true}
            register={register}
            errors={errors}
            validationSchema={{
              required: "This field is required",
            }}
            id={"pig_tag"}
          />
          <NormalInput
            type={"number"}
            label={"Weight(kg)"}
            name={`weight`}
            required={true}
            register={register}
            errors={errors}
            validationSchema={{
              required: "This field is required",
              min: {
                value: 1,
                message: "Weight must be greater than 0",
              },
            }}
            id={"weight"}
          />
        </div>
        <button type="submit" className="btn btn-info my-4">
          Add to list
        </button>
      </form>
      <table className="table table-compact w-full h-auto">
        <thead>
          <tr>
            <th></th>
            <th>Pig Id</th>
            <th>Cage Name</th>
            <th>Pig Tag</th>
            <th>Weight</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="w-full h-auto">
          {pigData.length == 0 ? (
            <tr className="text-center">
              <td colSpan={6}>No data added to list yet.</td>
            </tr>
          ) : (
            pigData.map((value: any, key: number) => {
              return (
                <tr key={key}>
                  <th>{key + 1}</th>
                  <th className="hidden">
                    <QRCodeCanvas id={value.pig_id} value={value.pig_id} />
                  </th>
                  <th>{value.pig_id}</th>
                  <td>{value.cage_name}</td>
                  <td>{value.pig_tag}</td>
                  <td>{value.weight}</td>
                  <td className="flex flex-row">
                    <button
                      type="button"
                      className="link text-info"
                      onClick={() => {
                        printJS(`${value.pig_id}`, "html");
                      }}
                    >
                      Print Qr Code
                    </button>
                    <div className="divider divider-horizontal"></div>
                    <button
                      className="link text-info"
                      type="button"
                      onClick={() => {
                        processQrCode(key, value.pig_id);
                      }}
                    >
                      Download{" "}
                    </button>
                    <div className="divider divider-horizontal"></div>
                    <button
                      type="button"
                      className="link link-error"
                      onClick={() => {
                        removePig(key);
                        subtractSelectedQuantity(value.cage_id);
                      }}
                    >
                      Remove
                    </button>
                    <div className="divider divider-horizontal"></div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
