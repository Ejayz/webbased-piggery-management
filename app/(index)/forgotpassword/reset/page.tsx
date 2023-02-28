"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import getBaseUrl from "@/hooks/getBaseUrl";
import PasswordBox from "@/components/FormComponents/passwordBox";
import InputBox from "@/components/FormComponents/inputbox";
import { validatePassword } from "@/hooks/useValidation";
export default function ResetPassword() {
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
  async function exec_reset(password: string) {
    setIsRequesting(true);

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: username,
      phone: phone,
      password: password,
      job: job,
    });

    let response = await fetch(`${base_url}/api/post/resetpassword`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = JSON.parse(await response.text());
    if (data.code == 200) {
      toast.success(data.message);
      setIsRequesting(false);
      rout.push("/");
    } else {
      toast.error(data.message);
      setIsRequesting(false);
    }
  }

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
              onSubmit={validateForm}
              data-theme="light"
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
              <div className="card-body">
                <PasswordBox
                  placeholder={"Password"}
                  name={"password"}
                  disabled={false}
                  className={`input input-bordered w-full h-10  `}
                  getter={password}
                  setter={setPassword}
                  required={true}
                  validation={validatePassword}
                  setIsValid={setIsPassword}
                ></PasswordBox>
                <InputBox
                  type={"password"}
                  label={"Repeat Password"}
                  placeholder={"Repeat Password"}
                  name={"repeatPass"}
                  disabled={false}
                  className={`input w-full input-bordered h-10  `}
                  getter={repeatPassword}
                  setter={setrepeatPass}
                  required={true}
                  validation={validatePassword}
                  setIsValid={setIsRepeatPassword}
                />

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
