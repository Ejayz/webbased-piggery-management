"use client";

import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { useQuery } from "react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import { useForm } from "react-hook-form";
import { moveBatch } from "@/hooks/usePigManagement";
import { toast } from "react-toastify";

export default function Page({ params }: any) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [cageList, setCageList] = useState<any>([]);

  const { data, isLoading, isFetching, error, refetch } = useQuery(
    ["batch_data", params.ID !== undefined],
    async () => {
      const response = await fetch(
        `${location.origin}/api/get/BatchManagement/getBatchDetails/${params.ID}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {}
  );

  const {
    data: data2,
    isLoading: isLoading2,
    isFetching: isFetching2,
    error: error2,
    refetch: refetch2,
  } = useQuery(
    "getCageList",
    async () => {
      const response = await fetch(
        `${location.origin}/api/post/BatchManagement/getCages`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
    {}
  );

  useEffect(() => {
    if (data2 !== undefined) {
      if (data2.code == 200) {
        if (!isFetching) {
          let List: any = [];
          data2.data.map((item: any, key: number) => {
            List.push({
              value: item.cage_id,
              display: item.cage_name,
              disabled:
                item.current_caged + data.data.pig_details.length >=
                item.cage_capacity,
            });
          });
          setCageList(List);
        }
      }
    }
  }, [data2]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cage_id: "",
    },
    criteriaMode: "all",
    mode: "all",
  });
  const onsubmit = async (data: any) => {
    const movePig = await moveBatch(params.ID, data.cage_id);
    if (movePig.code == 200) {
      toast.success(movePig.message);
      router.back();
    } else {
      toast.error(movePig.message);
    }
  };

  if (isFetching2 || isLoading2) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="w-full h-auto overflow-y-hidden">
        <div className="w-11/12  mx-auto flex flex-row">
          <p className="text-2xl text-base-content my-auto p-4">List</p>
        </div>

        <div className="w-full h-auto flex flex-col">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="w-11/12 flex flex-col mx-auto"
          >
            <SelectInput
              label="Cage"
              name="cage_id"
              register={register}
              errors={errors}
              options={cageList}
              disabled={false}
              required={true}
              validationSchema={{
                required: "This field is required",
              }}
            ></SelectInput>
            <div className="overflow-x-auto mx-auto w-11/12 flex flex-col">
              <div className="justify-content ml-auto my-4">
                <button
                  type="submit"
                  className="btn btn-warning mt-6 ml-auto mr-0"
                >
                  Move
                </button>
                <button
                  type="button"
                  className="btn ml-4 mr-4"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
