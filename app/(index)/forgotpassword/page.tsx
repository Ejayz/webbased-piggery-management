"use client";
"use client";
import { useState } from "react";
import Layout2 from "../../(components)/(forgotpassword)/(otp_form)/otp_form";
import Layout3 from "../../(components)/(forgotpassword)/(otp_form)/change_password";
import Layout1 from "../../(components)/(forgotpassword)/(otp_form)/verify_number";
export default function Page() {
  const [data, setData] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  if (data == 3) {
    setIsLastStep(true);
  }
  return (
    <>
      <div className={"bg-base-200 flex flex-col"}>
        <ul className="steps bg-base-200 steps-horizontal lg:steps-horizontal w-full mt-12">
          <li
            onClick={() => {
              if (data >= 1 || isLastStep) {
                setData(1);
              }
            }}
            className={`step ${data >= 1 ? "step-primary" : ""}`}
          >
            Verify
          </li>
          <li
            onClick={() => {
              if (data >= 2 || isLastStep) {
                setData(2);
              }
            }}
            className={`step ${data >= 2 ? "step-primary" : ""}`}
          >
            One Time Password
          </li>
          <li
            onClick={() => {
              if (data >= 3 || isLastStep) {
                setData(3);
              }
            }}
            className={`step ${data >= 3 ? "step-primary" : ""}`}
          >
            Reset Password
          </li>
        </ul>
        <div className={`h-full w-full ${data == 1 ? "block" : "hidden"}`}>
          <Layout1
            setText={data}
            setData={setData}
            setOTP={otp}
            setOTPData={setOtp}
          ></Layout1>
        </div>
        <div className={`w-full h-full ${data == 2 ? "block" : "hidden"}`}>
          <Layout2 setText={data} setState={setData} setOTP={otp}></Layout2>
        </div>

        <div className={`w-full h-full ${data == 1 ? "hidden" : "hidden"}`}>
          <Layout3 setText={data} setState={setData}></Layout3>
        </div>
      </div>
    </>
  );
}
