"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isatty } from "tty";
export default function ResetPassword({ setText, setState }: any) {
  const [newpass, setNewPass] = useState<string>("");
  const [repeatPass, setRepeatPass] = useState<string>("");
  const [isContainsNum, setisContainsNum] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isUpperLower, setIsUpperLower] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<boolean>(false);

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
    if (isUpperLower && isMatch && isLong && isContainsNum) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }
  useEffect(() => {
    checkAllowed();
  }, [newpass]);
  useEffect(() => {
    checkAllowed();
  }, [repeatPass]);
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
                <div className="flex flex-col ">
                  <div className="form-control">
                    <label className="cursor-pointer flex flex-row label justify-start">
                      <div className={`${isMatch ? "hidden" : "block"}`}>
                        {/* //Red X */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </div>

                      <div className={`${isMatch ? "block" : "hidden"}`}>
                        {/* //Green Check */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="green"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="label-text rtl ">
                        New Password Match
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label justify-start">
                      <div className={`${isLong ? "hidden" : "block"}`}>
                        {/* //Red X */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </div>

                      <div className={`${isLong ? "block" : "hidden"}`}>
                        {/* //Green Check */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="green"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="label-text ">
                        Contains 8 Character long password
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer justify-start label">
                      <div className={`${isUpperLower ? "hidden" : "block"}`}>
                        {/* //Red X */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </div>

                      <div className={`${isUpperLower ? "block" : "hidden"}`}>
                        {/* //Green Check */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="green"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="label-text ">
                        Contains UpperCase and LowerCase characters
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label justify-start">
                      <div className={`${isContainsNum ? "hidden" : "block"}`}>
                        {/* //Red X */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </div>

                      <div className={`${isContainsNum ? "block" : "hidden"}`}>
                        {/* //Green Check */}
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="green"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="label-text ">Contains Numbers</span>
                    </label>
                  </div>
                </div>
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
                <button disabled={allowed} className="btn btn-primary">
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
