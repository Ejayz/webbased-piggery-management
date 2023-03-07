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

export default function Page({ params }: any) {
  const [breed_name, setBreedName] = useState("");
  const [breed_id, setBreedId] = useState("");

  const [isBreedName, setIsBreedName] = useState(true);

  const Action = params.Action;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [startValidation, setStartValidation] = useState(false);
  let message: any = [];
  function resetState() {
    setBreedName("");
  }
  const verifyInput = async (e: any) => {
    e.preventDefault();
    if (breed_name == "") {
      toast.error("All fields are required.");
      return false;
    }
    if (!isBreedName) {
      toast.error("Please correct the inputs indicated in red.");
      return false;
    }
    if (params.Action == "Update") {
      if (!isBreedName) {
        toast.error("Please correct the inputs indicated in red.");
        return false;
      }
      var isOk = confirm("are you sure you want to update?");
      setIsSubmitting(true);
      if (isOk) {
        updateUser();
      } else {
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        return false;
      }

      exec_remove();
    }
  };

  const exec_remove = async () => {
    const returned = await Remove(breed_id);
    if (returned.code == 200) {
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  const updateUser = async () => {
    const returned = await Update(breed_id, breed_name);
    if (returned.code == 200) {
      resetState();
      callCancel(returned.message, "success");
      setIsSubmitting(false);
    } else {
      toast.error(returned.message);
      setIsSubmitting(false);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/breed_management/worker/List");
    } else {
      router.push(
        `/breed_management/worker/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    const exec = async () => {
      const returned = await View(Queryid);

      if (returned.code == 200) {
        setBreedName(returned.data[0].breed_name);
        setBreedId(returned.data[0].breed_id);
      } else {
        toast.error(returned.message);
        callCancel();
      }
    };

    if (Queryid !== null || Queryid !== undefined) {
      exec().then(() => {
        setStartValidation(true);
      });
    }
  }, [Queryid]);

  if (breed_id == "") {
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
              onSubmit={verifyInput}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
                <InputBox
                  type={"text"}
                  label={"Cage Name"}
                  placeholder={"Cage Name"}
                  name={"cagename"}
                  disabled={false}
                  className={`input text-base-content input-bordered h-10 ${
                    isBreedName ? "" : "input-error"
                  }`}
                  getter={breed_name}
                  setter={setBreedName}
                  autofocus={true}
                  required={true}
                  readonly={Action == "View" || Action == "Remove"}
                  validation={validateNormal}
                  setIsValid={setIsBreedName}
                  startValidation={startValidation}
                />
              </div>

              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-primary mx-4 ${
                      isSubmitting ? "loading" : ""
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
