"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getUserInfo from "@/components/getUserInfo";
import { Create, getData, Search, sortData } from "@/hooks/useUserManagement";
import InputBox from "@/components/FormComponents/inputbox";
import SelectBox from "@/components/FormComponents/selectBox";
import { toast } from "react-toastify";
import InputBoxLeft from "@/components/FormComponents/inputboxLeftLabel";
import PasswordBox from "@/components/FormComponents/passwordBox";
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import PasswordInput from "@/components/FormCompsV2/PasswordInput";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      middel_name: "",
      phone: "",
      job: "",
      password: "",
      repeat_password: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });
  const onSubmit = (data: any) => console.log();

  const [allowed, setIsAllowed] = useState(false);

  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("default");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isMiddleName, setIsMiddleName] = useState(true);
  const [isLastName, setIsLastName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isRepeatPassword, setIsRepeatPassword] = useState(false);

  const [requesting, setRequesting] = useState(false);
  const router = useRouter();
  const loading = getUserInfo();
  useEffect(() => {
    async function checkUser() {
      if (!loading.loading) {
        if (
          loading.data.job == "worker" ||
          loading.data.job == "veterinarian"
        ) {
          open("/?error=404", "_self");
          return false;
        }
        setIsAllowed(true);
      }
    }
    checkUser();
  }, [loading]);

  function resetState() {
    setUsername("");
    setFirst_name("");
    setMiddle_name("");
    setLast_name("");
    setPhone("");
    setJob("default");
    setPassword("");
    setrepeatPass("");
  }

  const validate = async (e: any) => {
    e.preventDefault();
    setRequesting(true);
    if (
      username == "" ||
      first_name == "" ||
      last_name == "" ||
      phone == "" ||
      job == "default"
    ) {
      setRequesting(false);
      toast.error("All feilds are required.");
      return false;
    }

    if (
      !(
        isUsername &&
        isFirstName &&
        isMiddleName &&
        isLastName &&
        isPhone &&
        isJob &&
        isPassword &&
        isRepeatPassword
      )
    ) {
      setRequesting(false);
      toast.error(
        "There are errors in your form. Please review and correct the input in the fields outlined in red before submitting."
      );
      return false;
    }
    if (password != repeatPassword) {
      setRequesting(false);
      toast.error("Password and Repeat Password should be the same.");
      return false;
    }
    if (!confirm("Are you sure you want to create?")) {
      return false;
    }

    createUser();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const validatePassword = (value: string) => {
    console.log(value);
    if (!/^(?=.*[0-9])/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/^(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/^(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/^.{6,}$/.test(value)) {
      return "Password must have a minimum length of 6 characters";
    } else {
      return true;
    }
  };

  const validateRepeatPassword = (value: string) => {
    const passwordValue = (
      document.getElementById("password") as HTMLInputElement
    )?.value;
    return value === passwordValue || "Passwords must match";
  };
  console.log(errors);
  async function createUser() {
    const returned = await Create(
      username,
      first_name,
      middle_name,
      last_name,
      password,
      phone,
      job
    );
    if (returned.code == 200) {
      setRequesting(false);
      toast.success(returned.message);
      resetState();
    } else {
      setRequesting(false);
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
                Manage User
              </p>
            </div>

            <div
              data-theme="light"
              className="card w-11/12 mx-auto bg-base-200 text-base-content shadow-xl "
            >
              <div className="card-body">
                <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
                  <ul className="card-title">
                    <li>Manage User</li>
                    <li className="font-bold">Create User</li>
                  </ul>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="post"
                  className="flex w-full h-auto py-2 flex-col"
                >
                  <div className="w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-3 gap-2">
                    <NormalInput
                      name={"username"}
                      label={"Username"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      validationSchema={{
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      }}
                    ></NormalInput>
                    <PasswordInput
                      name={"password"}
                      label={"Password"}
                      register={register}
                      errors={errors}
                      required={true}
                      validationSchema={{
                        required: "This field is required",
                        validate: validatePassword,
                      }}
                    ></PasswordInput>
                    <NormalInput
                      name={"repeat_password"}
                      label={"Repeat Password"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"password"}
                      validationSchema={{
                        required: "This field is required",
                        validate: validateRepeatPassword,
                      }}
                    ></NormalInput>
                  </div>
                  <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2 gap-2">
                    <NormalInput
                      name={"first_name"}
                      label={"First Name"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                    <NormalInput
                      name={"middle_name"}
                      label={"Middle Name"}
                      register={register}
                      errors={errors}
                      required={false}
                      type={"text"}
                      validationSchema={{}}
                    ></NormalInput>
                    <NormalInput
                      name={"last_name"}
                      label={"Last Name"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"text"}
                      validationSchema={{
                        required: "This field is required",
                      }}
                    ></NormalInput>
                  </div>
                  <div className="w-full ml-2 grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-none grid-cols-none">
                    <PhoneInput
                      name={"phone"}
                      label={"Phone Number"}
                      register={register}
                      errors={errors}
                      required={true}
                      type={"number"}
                      validationSchema={{
                        required: "This field is required",
                        minLength: {
                          value: 10,
                          message: "Min 10 Character long",
                        },
                        maxLength: {
                          value: 10,
                          message: "Max 10 Character long.",
                        },
                        pattern: {
                          value: /^\d+$/,
                          message: "Should only contain numbers",
                        },
                      }}
                      triggerValidation={trigger}
                      validateOnChange={true}
                    ></PhoneInput>
                    <SelectInput
                      name={"job"}
                      label={"Job"}
                      register={register}
                      errors={errors}
                      required={true}
                      options={[
                        {
                          value: "worker",
                          display: "Worker",
                          disabled: false,
                        },
                        {
                          value: "owner",
                          display: "Owner",
                          disabled: false,
                        },
                        {
                          value: "veterinarian",
                          display: "Veterinarian",
                          disabled: false,
                        },
                      ]}
                      validationSchema={{ required: "This field is required" }}
                    ></SelectInput>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      className={`btn btn-active btn-primary mx-4 ${
                        requesting ? "loading" : ""
                      }`}
                    >
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
