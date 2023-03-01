"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useBreedManagement";
import InputBox from "@/components/FormComponents/inputbox";
import { toast } from "react-toastify";
import {
  validateNormal,
  validatePassword,
  validatePhone,
  validateSelect,
  validateSkip,
} from "@/hooks/useValidation";
import PasswordBox from "@/components/FormComponents/passwordBox";

export default function Page() {
  const [allowed, setIsAllowed] = useState(false);

  const [breed_name, setBreedName] = useState("");

  const [isBreedName, setIsBreedName] = useState(true);

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

  function resetState() {
    setReset(!reset);
    setBreedName("");
  }

  const validate = async (e: any) => {
    e.preventDefault();
    if (breed_name == "") {
      toast.error("All feilds are required.");
      return false;
    }

    if (!isBreedName) {
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }

    if (!confirm("Are you sure you want to create?")) {
      return false;
    }
    createUser();
  };

  async function createUser() {
    const returned = await Create(breed_name);
    if (returned.code == 200) {
      toast.success(returned.message);
      resetState();
    } else {
      toast.error(returned.message);
    }
  }

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
                Manage Breed
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Breed</li>
                    <li className="font-bold">Creat Breed</li>
                  </ul>
                </div>

                <form
                  onSubmit={validate}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-1 lg:grid-rows-none grid-cols-none grid-rows-1">
                    <InputBox
                      type={"text"}
                      label={"Breed Name"}
                      placeholder={"Breed Name"}
                      name={"breedname"}
                      disabled={false}
                      className={"input input-bordered h-8"}
                      getter={breed_name}
                      setter={setBreedName}
                      required={true}
                      validation={validateNormal}
                      setIsValid={setIsBreedName}
                      reset={reset}
                    />
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
