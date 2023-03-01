"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import getBaseURL from "@/hooks/getBaseUrl";
import InputBoxLeft from "@/components/FormComponents/inputboxLeftLabel";
import {
  validateNormal,
  validatePhone,
  validateSelect,
} from "@/hooks/useValidation";
import InputBox from "@/components/FormComponents/inputbox";
import { useRouter } from "next/navigation";
import { setLocal } from "@/hooks/useSetLocal";
import SelectBox from "@/components/FormComponents/selectBox";
export default function Layout({}: any) {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const base_url = getBaseURL();
  const [requesting, isRequesting] = useState(false);

  const [isPhone, setIsPhone] = useState(true);
  const [isUsername, setIsUsername] = useState(true);
  const [startValidation, setStartValidation] = useState();
  const [job, setJob] = useState("default");
  const [isJob, setIsJob] = useState(true);
  const router = useRouter();
  async function getOTP(e: any) {
    e.preventDefault();
    isRequesting(true);
    if (username == "" || phone == "") {
      toast.error("Username/Phone number should not be empty");
      isRequesting(false);
    }
    if (!(isPhone && isUsername)) {
      console.log(isPhone || isUsername);
      console.log(isPhone);
      console.log(isUsername);
      toast.error("Please check all fields");
      isRequesting(false);
    } else {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        username: username,
        phone: phone,
        job: job,
      });

      let response = await fetch(`${base_url}/api/post/sms`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      let data = await response.text();
      const parsed = JSON.parse(data);
      if (parsed.code == 200) {
        toast.success(parsed.message);
        setUsername("");
        setPhone("");
        isRequesting(true);
        isRequesting(false);
        console.log(parsed);
        setLocal(parsed.OTP);
        router.push(
          `/forgotpassword/validateotp?username=${username}&phone=${phone}&job=${job}`
        );
      } else {
        toast.error(parsed.message);
        isRequesting(false);
      }
    }
  }
  return (
    <div className="w-full bg-base-100 h-screen">
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center text-base-content lg:text-left">
            <h1 className="text-3xl font-bold">Forgot password</h1>

            <ul className="list-disc ml-4">
              <li> Enter your username and phone number to recieve OTP</li>
              <li>
                Do not refresh or reload this page after recieving the OTP
              </li>
              <li>
                Phone number should start on <b>+63</b>.
              </li>
              <li>
                Phone number linked in your account is not available? Contact
                system administrator
              </li>
              <li>Use the steps indicator to go back to previous steps</li>
            </ul>
          </div>
          <form
            onSubmit={getOTP}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <InputBox
                type={"text"}
                label={"Username"}
                placeholder={"Username"}
                name={"username"}
                disabled={false}
                className={`input input-bordered h-10  text-base-content w-full`}
                getter={username}
                setter={setUsername}
                required={true}
                validation={validateNormal}
                setIsValid={setIsUsername}
              />
              <InputBoxLeft
                type="text"
                label={"Phone"}
                placeholder="Phone"
                name="phone"
                className={`input input-bordered h-10 text-base-content w-full`}
                getter={phone}
                setter={setPhone}
                required={true}
                startingData={"+63"}
                validation={validatePhone}
                setIsValid={setIsPhone}
              ></InputBoxLeft>
              <SelectBox
                label={"Job"}
                name={"Job"}
                selected={job}
                options={[
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
                ]}
                disabled={false}
                default_option={"Job"}
                setter={setJob}
                required={true}
                className={`input input-bordered h-10  `}
                validation={validateSelect}
                setIsValid={setIsJob}
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
              <div className="form-control mt-6">
                <button
                  disabled={requesting}
                  className={`btn btn-primary   ${requesting ? "loading" : ""}`}
                >
                  GET OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
