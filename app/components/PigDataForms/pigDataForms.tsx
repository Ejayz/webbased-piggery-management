"use client";
import { IdGenerator } from "@/hooks/usePigManagement";
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
interface SelectedCage {
  cage_id: string;
  selected_quantity: number;
}
export default function ({ pigData, setPigData, clear, setResset }: any) {
  const [cageList, setCageList] = useState<SelectInter[]>([]);
  const [cageSelected, setCageSelected] = useState<SelectedCage[]>([]);
  const [hideScanner, setHideScanner] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      pig_id: "",
      pig_tag: "",
      weight: "",
      cage_id: "",
    },
  });

  const { isLoading, error, data, refetch } = useQuery(
    "pigDetails",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/PigManagement/getFormDetail`
      );
      const date = new Date();
      const epochTime = date.getTime() / 1000;
      const data = await response.json();
      data.time = epochTime;
      return data;
    },
    {
      cacheTime: 0,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const evaluateCage = async (list: any) => {
    for (let i = 0; i < cageSelected.length; i++) {
      cageSelected[i].cage_id == data.cage_id;
      for (let j = 0; j < list.length; j++) {
        if (cageSelected[i].cage_id == list[j].cage_id) {
          if (cageSelected[i].selected_quantity >= list[j].value) {
            list[j] = {
              value: data.cage_id,
              display: "data.cage_name",
              disabled: true,
              max: data.cage_capacity,
              current_capacity: data.current_caged,
            };
          }
        }
      }
    }

    return list;
  };

  const triggerUpdate = async () => {
    setCageList([]);
    const id = await idSetter();
    const cage_list = data.data.PigletCageList;
    const listCage: any = [];
    cage_list.map((data: any, key: any) => {
      listCage.push({
        value: data.cage_id,
        display: data.cage_name,
        disabled: cageSelected.some((cage) =>
          cage.cage_id == data.cage_id
            ? cage.selected_quantity >= data.cage_capacity
              ? true
              : false
            : false
        ),
        max: data.cage_capacity,
        current_capacity: data.current_caged,
      });
    });
    const list = await evaluateCage(listCage);
    setCageList(list);
    setValue("pig_id", id);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (data.code == 200) {
        triggerUpdate();
      }
    }
  }, [data]);
  const resetState = async () => {
    reset();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);
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

  const idSetter = async () => {
    return await IdGenerator();
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
      refetch();
      setResset(false);
      setPigData([]);
    }
  }, [clear]);
  const removePig = (index: any) => {
    const updated = [...pigData];
    updated.splice(index, 1);
    setPigData(updated);
  };

  const onSubmit = async (data: any) => {
    let exist = await checkIsExist(data.cage_id);

    if (cageSelected.some((cage) => cage.cage_id == data.cage_id)) {
      addSelectedQuantity(data.cage_id);
    } else {
      let current = await getCageDetails(data.cage_id);
      await addSelected(data.cage_id, current);
    }
    pigData.push(data);
    resetState();
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
            <button onClick={() => {}} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
      <span></span>
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
          />

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
            label={"Weight"}
            name={`weight`}
            required={true}
            register={register}
            errors={errors}
            validationSchema={{
              required: "This field is required",
            }}
            id={"weight"}
          />
        </div>
        <button type="submit" className="btn btn-primary my-4">
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
                  <td>{value.cage_id}</td>
                  <td>{value.pig_tag}</td>
                  <td>{value.weight}</td>
                  <td className="flex flex-row">
                    <button
                      type="button"
                      className="link "
                      onClick={() => {
                        printJS(`${value.pig_id}`, "html");
                      }}
                    >
                      Print Qr Code
                    </button>
                    <div className="divider divider-horizontal"></div>
                    <button
                      className="link"
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
                      className="link"
                      onClick={() => {
                        removePig(key);
                        subtractSelectedQuantity(value.cage_id);
                        refetch();
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
