"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function ResetPassword({ setText, setState }: any) {
  const [newpass, setNewPass] = useState<string>();
  const [repeatPass, setRepeatPass] = useState<string>();
  const [isContainsNum, setisContainsNum] = useState<boolean>();
  
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
                  type="password"
                  placeholder="repeat password"
                  className="input input-bordered"
                />
                <div className="flex flex-col ">
                  <div className="form-control">
                    <label className="cursor-pointer flex flex-row label justify-start">
                      <Image
                        src={"/assets/icons/x-solid.svg"}
                        width={15}
                        height={15}
                        alt={""}
                        className={"mx-2"}
                      ></Image>
                      <span className="label-text rtl ">
                        New Password Match
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label justify-start">
                      <Image
                        src={"/assets/icons/x-solid.svg"}
                        width={15}
                        height={15}
                        alt={""}
                        className={"mx-2"}
                      ></Image>
                      <span className="label-text ">
                        Contains 8 Character long password
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer justify-start label">
                      <Image
                        src={"/assets/icons/x-solid.svg"}
                        width={15}
                        height={15}
                        alt={""}
                        className={"mx-2"}
                      ></Image>
                      <span className="label-text ">
                        Contains UpperCase and LowerCase characters
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label justify-start">
                      <Image
                        src={"/assets/icons/x-solid.svg"}
                        width={15}
                        height={15}
                        alt={""}
                        className={"mx-2"}
                      ></Image>
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
                <button className="btn btn-primary">CHANGE PASSWORD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
