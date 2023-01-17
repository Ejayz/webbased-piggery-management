"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getBaseUrl from "../../getBaseUrl";
export default function ResetPassword({
  setText,
  setState,
  getPhone,
  getUsername,
}: any) {
  const [newpass, setNewPass] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [isContainsNum, setisContainsNum] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isUpperLower, setIsUpperLower] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<boolean>(true);
  const [requesting, setIsRequesting] = useState(false);
  const rout = useRouter();
  const base_url = getBaseUrl()

  async function hasMatch() {
    if (newpass == repeatPass && (newpass !== "" || repeatPass !== "")) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }

  async function resetPass(password: string) {
    setIsRequesting(true);
    if (newpass !== repeatPass) {
      toast.error("Password and Repeat password should be the same.");
      setIsRequesting(false);
      return false;
    }
    if (!(password.length >= 8)) {
      toast.error("atleast 8 Character long password is required");
      setIsRequesting(false);
      return false;
    }
    if (!/\d/.test(password)) {
      toast.error("Password should contain atleast 1 number");
      setIsRequesting(false);
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password should contain atleast 1 UpperCase letter");
      setIsRequesting(false);
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password should contain atleast 1 LowerCase letter");
      setIsRequesting(false);
      return false;
    }
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: getUsername,
      phone: getPhone,
      password: newpass,
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
      rout.push("/")
    } else {
      toast.error(data.message);
      setIsRequesting(false);
    }
  }

  useEffect(() => {
    hasMatch();
  }, [newpass, repeatPass]);

  return (
    <>
      <div className="hero h-auto my-auto bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Change Password</h1>
            <ul className="list-disc ml-6">
              <li>Use minimium of 8 character password</li>
              <li>Use a combination of number,lower and uppercase letter.</li>
            </ul>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  value={newpass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  type="password"
                  placeholder="new password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Repeat Password</span>
                </label>
                <input
                  value={repeatPass}
                  onChange={(e) => {
                    setRepeatPass(e.target.value);
                  }}
                  type="password"
                  placeholder="repeat password"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link
                    href="#"
                    as="/"
                    className="label-text-alt link link-hover"
                  >
                    Remembered your password? Login
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={!isMatch}
                  onClick={() => {
                    resetPass(newpass);
                  }}
                  className={`btn btn-primary ${requesting ? "loading" : ""}`}
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
