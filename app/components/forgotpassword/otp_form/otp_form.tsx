"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Layout({ setText, setState, setOTP }: any) {
  const [otp, setOtp] = useState<string>("");
  const [isRequesting, setIsRequesting] = useState(false);
  const OTP = setOTP;
  async function checkOtp(e: any) {
    e.preventDefault();
    setIsRequesting(true);
    if (otp == OTP) {
      setState(3);
      toast.success("OTP Verificaton verfied . Change your password now!");
      setIsRequesting(false);
    } else {
      setIsRequesting(false);
      toast.error(
        "OTP do not match.Please enter the correct OTP you recieved."
      );
    }
  }

  return (
    <>
      <div className="hero h-full  bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center text-base-content ml-4 lg:text-left">
            <h1 className="text-5xl  font-bold">One Time Password</h1>

            <ul className="list-disc">
              <li>Wait for OTP to arrive from your phone.</li>
              <li>Enter the OTP in the OTP input feild.</li>
              <li>
                Do not refresh the page. OTP sent to your phone number is only
                valid for this session.
              </li>
              <li>Click Verify</li>
            </ul>
          </div>
          <form
            onSubmit={checkOtp}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">One Time Password</span>
                </label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  placeholder="One Time Password"
                  className="input text-base-content input-bordered"
                />
                <label className="label label-text">
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
                  type={"submit"}
                  className={`btn  ${
                    isRequesting ? "loading btn-secondary" : "btn-primary"
                  }`}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
