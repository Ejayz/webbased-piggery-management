"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isatty } from "tty";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
  async function hasUpperLower(str: string) {
    let hasUpper = false;
    let hasLower = false;

    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "A" && str[i] <= "Z") {
        hasUpper = true;
      } else if (str[i] >= "a" && str[i] <= "z") {
        hasLower = true;
      }
    }

    return hasUpper && hasLower;
  }
  async function hasMatch() {
    if (newpass == repeatPass && (newpass !== "" || repeatPass !== "")) {
      return true;
    } else {
      return false;
    }
  }
  async function hasNumber(str: string) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "0" && str[i] <= "9") {
        return true;
      }
    }

    return false;
  }

  async function hasLong() {
    if (newpass.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  async function checkAllowed() {
    setIsUpperLower(await hasUpperLower(newpass));
    setIsMatch(await hasMatch());
    setIsLong(await hasLong());
    setisContainsNum(await hasNumber(newpass));
    setAllowed(!(isUpperLower && isMatch && isLong && isContainsNum));
  }

  async function resetPass() {
    setIsRequesting(true);
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

    let response = await fetch("http://localhost:3000/api/post/resetpassword", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = JSON.parse(await response.text());
    if (data.code == 200) {
      toast.success(data.message);
      setIsRequesting(false);
      useRouter().push("/");
    } else {
      toast.error(data.message);
      setIsRequesting(false);
    }
  }

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
                  type="text"
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
                  type="text"
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
                  disabled={allowed}
                  onClick={resetPass}
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
