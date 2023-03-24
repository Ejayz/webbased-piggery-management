"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create } from "@/hooks/useUserManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PasswordInputShow from "@/components/FormCompsV2/PasswordInputShow";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "react-query";
import { createPlan } from "@/hooks/usePlan";

interface finalData {
  plan_name: string;
}
export default function Page() {
  const {
    register: registerPlan,
    handleSubmit: handleSubmitPlan,
    reset: resetPlan,
    watch: watchPlan,
    setValue: setValuePlan,
    trigger: triggerPlan,
    formState: {
      errors: errorsPlan,
      isSubmitSuccessful: isSubmitSuccessfulPlan,
      isSubmitting: isSubmittingPlan,
      isSubmitted: isSubmittedPlan,
    },
  } = useForm({
    defaultValues: { plan_name: "" },
    criteriaMode: "all",
    mode: "onChange",
  });
  const [allowed, setIsAllowed] = useState(false);
  const [finalData, setFinalData] = useState("");
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();

  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (loading.data.job == "worker" || loading.data.job == "owner") {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);

  function resetState() {
    resetPlan();
  }

  const onSubmitPlan = async (data: any) => {
    if (!confirm("Create plan ?")) {
      return false;
    } else {
      const returned = await createPlan(data.plan_name);
      if (returned.code == 200) {
        toast.success("Plan created");
        resetState();
        if (confirm("Want to create the plan details ?")) {
          open(
            `/plans_management/veterinarian/Create/details/${returned.data}`,
            "_self"
          );
        }
      } else {
        toast.error(returned.message);
      }
    }
  };

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
                Manage Plans
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage Plan</li>
                    <li className="font-bold">Create Plan Objectives</li>
                  </ul>
                </div>

                <form
                  onSubmit={handleSubmitPlan(onSubmitPlan)}
                  method="post"
                  className={`flex w-full h-auto py-2 flex-col`}
                >
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    <div>
                      <label className="label"> Plan Name*</label>
                      <input
                        readOnly={finalData != ""}
                        {...registerPlan("plan_name", {
                          required: "Plan name is required",
                        })}
                        className="input"
                      />
                      <ErrorMessage
                        errors={errorsPlan}
                        name="plan_name"
                        render={({ message }) => (
                          <p className="mt-2 text-sm  text-error">
                            <span className="font-medium">{message}</span>{" "}
                          </p>
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={`card-actions justify-end ${
                      finalData != "" ? "hidden" : ""
                    }`}
                  >
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
                      Create
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        resetPlan();
                      }}
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
