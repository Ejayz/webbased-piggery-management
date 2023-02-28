"use client";
import { useRef, useState, MutableRefObject } from "react";
import Layout2 from "@/app/components/forgotpassword/otp_form/otp_form";
import Layout3 from "@/app/components/forgotpassword/otp_form/change_password";
import Layout1 from "@/app/components/forgotpassword/otp_form/verify_number";
export default function Page() {
  const [data, setData] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const isLastStep: MutableRefObject<boolean> = useRef(false);
  if (data == 3) {
    isLastStep.current = true;
  }
  return (
    <>
      <div className={" flex h-screen flex-col"}>
        <div className="w-full bg-base-100">
          <ul className="steps bg-base-100 steps-horizontal text-base-content lg:steps-horizontal w-full mt-12">
            <li
              onClick={(e) => {
                if (data >= 1) {
                  setData(1);
                }
              }}
              className={`step ${data >= 1 ? "step-primary" : ""}`}
            >
              Verify
            </li>
            <li
              onClick={(e) => {
                if (data >= 2) {
                  setData(2);
                }
              }}
              className={`step ${data >= 2 ? "step-primary" : ""}`}
            >
              One Time Password
            </li>

            <li
              onClick={(e) => {
                if (data >= 3) {
                  setData(3);
                }
              }}
              className={`step ${data >= 3 ? "step-primary" : ""}`}
            >
              Reset Password
            </li>
          </ul>
        </div>
        <div
          className={`h-full bg-base-100 flex w-full ${
            data == 1 ? "block" : "hidden"
          }`}
        >
          <Layout1
            setText={data}
            setData={setData}
            setOTP={otp}
            setOTPData={setOtp}
            setUser={setUsername}
            setNumber={setPhone}
          ></Layout1>
        </div>
        <div className={`w-full flex h-full ${data == 2 ? "block" : "hidden"}`}>
          <Layout2 setText={data} setState={setData} setOTP={otp}></Layout2>
        </div>

        <div className={`w-full flex h-full ${data == 3 ? "block" : "hidden"}`}>
          <Layout3
            setText={data}
            getUsername={username}
            getPhone={phone}
            setState={setData}
          ></Layout3>
        </div>
      </div>
    </>
  );
}
