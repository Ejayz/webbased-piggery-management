"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { VerifyUser } from "@/hooks/useLogin";
import Image from "next/image";
import SelectBox from "@/components/FormComponents/selectBox";
import { validateSelect } from "@/hooks/useValidation";
import { useForm } from "react-hook-form";
import Error from "@/components/Errors/Error";
import { ErrorMessage } from "@hookform/error-message";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
import PasswordInput from "@/components/FormCompsV2/PasswordInput";

export default function Page() {
  //Create states for username password and remember me
  let job_option = [
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
  ];
  const [requesting, isRequesting] = useState<boolean>(false);
  const router = useRouter();

  const exec_login = async (data: any) => {
    const returned = await VerifyUser(
      data.username,
      data.password,
      data.remember_me,
      data.job
    );
    if (returned.code == 200) {
      toast.success(returned.message);
      router.push("/dashboard");
      isRequesting(false);
    } else {
      isRequesting(false);
      toast.error(returned.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => exec_login(data);

  return (
    <>
      <div className="hero bg-base-100 h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-base-content font-bold">Login Now!</h1>
            <p className="py-6 text-base-content">
              Piggery Management System that is easy to use
            </p>
            <h1 className="text-5xl text-base-content font-bold">
              No account?{" "}
            </h1>
            <p className="py-6 text-base-content">
              Contact server administrator for your account!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full bg-primary-content max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <NormalInput
                name={"username"}
                label={"Username"}
                register={register}
                errors={errors}
                required={true}
                type={"text"}
                validationSchema={{
                  required: "This field is required",
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
                }}
              ></PasswordInput>
              <SelectInput
                name={"job"}
                label={"Job"}
                register={register}
                errors={errors}
                required={true}
                options={job_option}
                validationSchema={{
                  required: "This field is required",
                }}
              ></SelectInput>
              <div className="form-control">
                <label className="label label-text">
                  <Link href="#" as={"/forgotpassword/verifysms"}>
                    Forgot password?
                  </Link>
                </label>
                <div
                  className="form-control  tooltip"
                  data-tip="You will not be logged out for 30 days."
                >
                  <label className="label justify-start flex cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      type="checkbox"
                      className="checkbox ml-4 checkbox-primary"
                      {...register("remember_me")}
                    />
                  </label>
                </div>
              </div>
              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  disabled={requesting}
                  className={`btn btn-primary  ${
                    requesting ? "loading btn-seconday" : ""
                  }`}
                  aria-label="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
