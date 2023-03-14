"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import getBaseUrl from "@/hooks/getBaseUrl";
import PasswordBox from "@/components/FormComponents/passwordBox";
import InputBox from "@/components/FormComponents/inputbox";
import { validatePassword } from "@/hooks/useValidation";
import { useForm } from "react-hook-form";
import PasswordInputShow from "@/components/FormCompsV2/PasswordInputShow";
import NormalInput from "@/components/FormCompsV2/NormalInput";
export default function ResetPassword() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeat_password: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });
  const [allowed, setAllowed] = useState<boolean>(true);
  const [requesting, setIsRequesting] = useState(false);
  const rout = useRouter();
  const base_url = getBaseUrl();
  const phone = useSearchParams().get("phone");
  const username = useSearchParams().get("username");
  const job = useSearchParams().get("job");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPass] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isRepeatPassword, setIsRepeatPassword] = useState(false);

  const validateRepeatPassword = (value: string) => {
    const passwordValue = (
      document.getElementById("password") as HTMLInputElement
    )?.value;
    return value === passwordValue || "Password and Repeat password must match";
  };

  const validateForm = async (e: any) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      toast.error("Password and Repeat password should be the same.");
      setIsRequesting(false);
      return false;
    }
    if (!(isPassword && isRepeatPassword)) {
      toast.error("Please check all fields");
      setIsRequesting(false);
      return false;
    }
    if (!confirm("Are you sure you want to reset?")) {
      return false;
    } else {
      exec_reset(password);
    }
  };
  async function exec_reset(data: any) {
    setIsRequesting(true);

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: username,
      phone: phone,
      password: data.password,
      job: job,
    });

    let response = await fetch(`${base_url}/api/post/resetpassword`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let returned = JSON.parse(await response.text());
    if (returned.code == 200) {
      toast.success(returned.message);
      setIsRequesting(false);
      rout.push("/");
    } else {
      toast.error(returned.message);
      setIsRequesting(false);
    }
  }
  const onSubmit = (data: any) => {
    setIsRequesting(true);
    if (!confirm("Reset password? ")) {
      setIsRequesting(false);
      return false;
    }
    exec_reset(data);
  };

  return (
    <>
      <div className="w-full h-screen bg-base-100">
        <div className="hero h-full  bg-base-100">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center text-base-content  lg:text-left">
              <h1 className="text-3xl font-bold">Change Password</h1>
              <ul className="list-disc ml-6">
                <li>Use minimium of 8 character password</li>
                <li>Use a combination of number,lower and uppercase letter.</li>
              </ul>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              data-theme="light"
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
              <div className="card-body">
                <PasswordInputShow
                  name={"password"}
                  label={"Password"}
                  register={register}
                  errors={errors}
                  required={true}
                  validationSchema={{
                    required: "This field is required",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: `A valid password should include one lowercase, one uppercase, one number, and at least eight characters.`,
                    },
                  }}
                ></PasswordInputShow>
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
                <label className="label label-text">
                  <Link
                    href="#"
                    as="/"
                    className="label-text-alt link link-hover"
                  >
                    Remembered your password? Login
                  </Link>
                </label>
                <div className="form-control mt-6">
                  <button
                    onClick={() => {}}
                    className={`btn btn-primary ${requesting ? "loading" : ""}`}
                  >
                    CHANGE PASSWORD
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
