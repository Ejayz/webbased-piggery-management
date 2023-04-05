"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { toast } from "react-toastify";
import {
  CreatePigs,
} from "@/hooks/usePigManagement";
import { useQueryClient } from "react-query";
import PigDataForms from "@/components/PigDataForms/pigDataForms";
import GeneralPigBatch from "@/components/PigDataForms/GeneralPigBatch";
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
}
interface BatchData {
  batch_id: string;
  boar_id: string;
  sow_id: string;
  pig_type: string;
  birth_date: string;
  breed_id: string;
  batch_name: string;
}
export default function Page() {
  const queryClient = useQueryClient();

  const [allowed, setIsAllowed] = useState(false);
  const [pigData, setPigData] = useState<PigData[]>([]);
  const [batchData, setBatchData] = useState<BatchData>();
  const [showPigData, setShowPigData] = useState(false);
  const qrCodeContainer = useRef<any>();
  const [hideScanner, setHideScanner] = useState({ show: false, index: 0 });
  const router = useRouter();
  const loading = getUserInfo();
  const [processing, setProcessing] = useState(false);
  const [doneRender, setDoneRender] = useState(false);

  const [resset, setResset] = useState(false);

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

  const exec_create = async () => {
    const returned = await CreatePigs(
      batchData?.batch_id,
      batchData?.boar_id,
      batchData?.sow_id,
      batchData?.pig_type,
      batchData?.birth_date,
      batchData?.breed_id,
      pigData,
      batchData?.batch_name
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      setProcessing(false);
      setResset(true);
    } else {
      setProcessing(false);
      toast.error(returned.message);
    }
  };

  const onSubmit = () => {
    console.log(pigData);
    if (batchData == undefined || pigData.length == 0) {
      toast.error("Please complete the forms before creating pig details");
    } else {
      exec_create();
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
          checked={hideScanner.show}
          onChange={() => {
            setHideScanner({
              show: !hideScanner.show,
              index: 0,
            });
          }}
          className="modal-toggle"
        />

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
                    <li>Create</li>
                    <li className="font-bold">Pigs</li>
                  </ul>
                </div>
                <GeneralPigBatch
                  setShowPigData={setShowPigData}
                  showPigData={showPigData}
                  setBatchData={setBatchData}
                  clear={resset}
                ></GeneralPigBatch>

                <div className={`${showPigData ? "" : "hidden"}`}>
                  <div className="flex flex-col w-full border-opacity-50">
                    <div className="divider">Pig Details</div>
                  </div>
                  <PigDataForms
                    pigData={pigData}
                    setPigData={setPigData}
                    clear={resset}
                    setResset={setResset}
                  ></PigDataForms>
                </div>
                <div>
                  <div
                    className={`card-actions justify-end mt-6 ${
                      showPigData ? "" : "hidden"
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSubmit();
                      }}
                      type="button"
                      className="btn btn-primary "
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setResset(true);
                      }}
                      type="button"
                      className="btn btn-primary "
                    >
                      Reset
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
