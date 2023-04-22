"use client";

import InputBox from "@/components/FormComponents/inputbox";
import InputBoxLeft from "@/components/FormComponents/inputboxLeftLabel";
import PasswordBox from "@/components/FormComponents/passwordBox";
import SelectBox from "@/components/FormComponents/selectBox";
import { Remove, Update, ViewUser } from "@/hooks/useUserManagement";
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
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import PasswordInputShow from "@/components/FormCompsV2/PasswordInputShow";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function Page({ params }: any) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: "",
      username: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      phone: "",
      job: "",
      password: "",
      repeat_password: "",
    },
    criteriaMode: "all",
    mode: "onChange",
  });

  const [user_id, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("default");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");

  const [isUsername, setIsUsername] = useState(true);
  const [isFirstName, setIsFirstName] = useState(true);
  const [isMiddleName, setIsMiddleName] = useState(true);
  const [isLastName, setIsLastName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isJob, setIsJob] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isRepeatPassword, setIsRepeatPassword] = useState(true);

  const Action = params.Action;
  const router = useRouter();
  const Queryid = useSearchParams().get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startValidation, setStartValidation] = useState(false);
  const [requesting, setRequesting] = useState(false);
  let message: any = [];

  const { error, isLoading, data }: any = useQuery(
    ["getUserinfo", Queryid !== null || Queryid !== undefined],
    async () => {
      let headersList = {
        Accept: "*/*",
      };
      const response = await fetch(
        `${location.origin}/api/post/UserManagement/view_user/${Queryid}`,
        {
          method: "POST",
          headers: headersList,
        }
      );
      return response.json();
    }
  );

  function resetState() {
    reset();
  }

  const exec_remove = async (data: any) => {
    const returned = await Remove(data.user_id);
    if (returned.code == 200) {
      setRequesting(false);
      callCancel(returned.message, "success");
    } else {
      setRequesting(false);
      toast.error(returned.message);
    }
  };

  const validateRepeatPassword = (value: string) => {
    const passwordValue = (
      document.getElementById("password") as HTMLInputElement
    )?.value;
    return value === passwordValue || "Password and Repeat password must match";
  };
  const updateUser = async (data: any) => {
    const returned = await Update(
      data.username,
      data.password,
      data.first_name,
      data.middle_name,
      data.last_name,
      data.phone,
      data.job,
      data.user_id
    );
    if (returned.code == 200) {
      resetState();
      setRequesting(false);
      callCancel(returned.message, "success");
    } else {
      setRequesting(false);
      toast.error(returned.message);
    }
  };

  if (Queryid == undefined) {
  }

  function callCancel(message?: string, status?: string) {
    if (message == undefined) {
      router.push("/user_management/owner/List");
    } else {
      router.push(
        `/user_management/owner/List?msg=${message}&status=${status}`
      );
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      if (data.code == 200) {
        setValue("user_id", data.data[0].user_id);
        setValue("username", data.data[0].username);
        setValue("job", data.data[0].job);
        setValue("last_name", data.data[0].last_name);
        setValue("middle_name", data.data[0].middle_name);
        setValue("first_name", data.data[0].first_name);
        setValue("phone", data.data[0].phone);
      } else {
        toast.error(message);
        callCancel();
      }
    }
  }, [data]);

  const onSubmit = (data: any) => {
    setRequesting(true);
    if (params.Action == "Update") {
      var isOk = confirm("are you sure you want to update?");
      if (isOk) {
        updateUser(data);
      } else {
        setRequesting(false);
        return false;
      }
    } else if (params.Action == "Remove") {
      if (!confirm("Are you sure you want to remove?")) {
        setRequesting(false);
        return false;
      }
      exec_remove(data);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  } else if (Action != "Update" && Action != "Remove" && Action != "View") {
    return <PageNotFound></PageNotFound>;
  } else {
    return (
      <>
        <div className=" h-auto w-full">
          <div className="w-11/12  mx-auto flex flex-row">
            <p className="text-2xl text-base-content my-auto p-4">
              Manage User
            </p>
          </div>
        </div>
        <div className=" mx-auto text-base-content w-11/12 ">
          <div className="">
            <div className="text-sm mt-2 ml-2  overflow-hidden breadcrumbs">
              <ul>
                <li>User Management</li>

                <li>View</li>

                <li className="font-bold">{Action}</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="flex w-full h-auto py-2 flex-col"
            >
              <div
                className={`w-full ml-2 grid lg:grid-cols-3 lg:grid-rows-none grid-cols-none grid-rows-${
                  Action == "Update" ? 3 : 1
                } gap-2`}
              >
                <NormalInput
                  name={"username"}
                  label={"Username"}
                  register={register}
                  errors={errors}
                  readonly={Action == "View" || Action == "Remove"}
                  required={true}
                  type={"text"}
                  validationSchema={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                ></NormalInput>
                {Action == "Update" ? (
                  <>
                    <PasswordInputShow
                      name={"password"}
                      label={"Password"}
                      register={register}
                      errors={errors}
                      required={false}
                      readonly={Action == "View" || Action == "Remove"}
                      validationSchema={{
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                          message: `Valid password: 8+ characters, 1 lowercase, 1 uppercase, 1 number.`,
                        },
                      }}
                    ></PasswordInputShow>
                    <NormalInput
                      name={"repeat_password"}
                      label={"Repeat Password"}
                      register={register}
                      errors={errors}
                      required={false}
                      readonly={Action == "View" || Action == "Remove"}
                      type={"password"}
                      validationSchema={{
                        validate: validateRepeatPassword,
                      }}
                    ></NormalInput>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="w-full grid grid-rows-3 grid-cols-none lg:grid-cols-3 lg:grid-rows-none ml-2 gap-2">
                <NormalInput
                  name={"first_name"}
                  label={"First Name"}
                  register={register}
                  errors={errors}
                  readonly={Action == "View" || Action == "Remove"}
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
                  readonly={Action == "View" || Action == "Remove"}
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
                  readonly={Action == "View" || Action == "Remove"}
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
                  readonly={Action == "View" || Action == "Remove"}
                  required={true}
                  type={"number"}
                  validationSchema={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^9\d{9}$/,
                      message: "Phone number format: 9XXXXXXXXX.",
                    },
                  }}
                ></PhoneInput>
                <SelectInput
                  name={"job"}
                  label={"Job"}
                  register={register}
                  readonly={Action == "View" || Action == "Remove"}
                  errors={errors}
                  required={true}
                  disabled={true}
                  options={[
                    {
                      value: "worker",
                      display: "Worker",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "owner",
                      display: "Owner",
                      disabled: Action == "View" || Action == "Remove",
                    },
                    {
                      value: "veterinarian",
                      display: "Veterinarian",
                      disabled: Action == "View" || Action == "Remove",
                    },
                  ]}
                  validationSchema={{ required: "This field is required" }}
                ></SelectInput>
              </div>
              <div className="card-actions justify-end">
                {params.Action == "View" ? (
                  <></>
                ) : params.Action == "Update" ? (
                  <button
                    className={`btn btn-active btn-warning mx-4 ${
                      requesting ? "loading" : ""
                    }`}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className={`btn btn-active btn-error mx-4 ${
                      requesting ? "loading" : ""
                    }`}
                  >
                    REMOVE
                  </button>
                )}
                <Link
                  onClick={(e) => {
                    callCancel();
                  }}
                  className="btn btn-active  mx-4"
                  href={"/user_management/owner/List"}
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
