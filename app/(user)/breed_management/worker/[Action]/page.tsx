"use client";

import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, View } from "@/hooks/useBreedManagement";
import {
  validateNormal,
  validatePhone,
  validateSelect,
  validateSkip,
  validateUpdatePassword,
} from "@/hooks/useValidation";
import Loading from "@/components/Loading/loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageNotFound from "@/components/Errors/PageNotFound";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import NormalInput from "@/components/FormCompsV2/NormalInput";

export default function Page({ params }: any) {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      breed_id: "",
      breed_name: "",
    },
  });

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  const [processing, setProcessing] = useState(false);
  let message: any = [];
  function resetState() {
    reset();
  }

  const exec_remove = async (data: any) => {
    const returned = await Remove(data.breed_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setProcessing(false);
    } else {
      toast.error(returned.message);
      setProcessing(false);
    }
  };

  const updateUser = async (data: any) => {
    const returned = await Update(data.breed_id, data.breed_name);
    if (returned.code == 200) {
      resetState();
      callCancel(returned.message, "success");
      setProcessing(false);
    } else {
      toast.error(returned.message);
      setProcessing(false);
    }
  };

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/breed_management/worker/List");
    } else {
      router.push(
        `/breed_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }

  const { isLoading, error, data } = useQuery(
    ["getBreed", Queryid !== null || Queryid !== undefined],
    async () => {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let response = await fetch(
        `${location.origin}/api/post/BreedManagement/${Queryid}`,
        {
          method: "POST",

          headers: headersList,
        }
      );

      return response.json();
    }
  );
  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      if (data.code == 200) {
        setValue("breed_name", data.data[0].breed_name);
        setValue("breed_id", data.data[0].breed_id);
      } else {
        toast.error(data.message);
        callCancel();
      }
    }
  }, [data]);

  const onSubmit = (data: any) => {
    if (params.Action == "Update") {
      var isOk = confirm("are you sure you want to update?");

      if (isOk) {
        updateUser(data);
      } else {
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        setProcessing(false);
        return false;
      }

      exec_remove(data);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full h-1/2 flex">
          <Loading height={"h-1/2"}></Loading>
        </div>
      </>
    );
  } else if (Action != "Update" && Action != "Remove" && Action != "View") {
    return <PageNotFound></PageNotFound>;
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">
              Manage Breed
            </p>
          </div>
        </div>
        <div
          data-theme="light"
          className="card mx-auto text-base-content w-11/12 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>Breed Management</li>

                <li>View</li>

                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
                <NormalInput
                  name={"breed_name"}
                  label={"Breed Name"}
                  register={register}
                  errors={errors}
                  required={true}
                  type={"text"}
                  readonly={Action == "View" || Action == "Remove"}
                  validationSchema={{
                    required: "This field is required",
                  }}
                ></NormalInput>
              </div>

              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      processing ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      processing ? "loading" : ""
                    }`}
                  >
                    REMOVE
                  </button>
                )}
                <Link
                  onClick={(e) => {
                    callCancel();
                  }}
                  className="btn btn-active btn-primary mx-4"
                  href={"/breed_management/worker/List"}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
