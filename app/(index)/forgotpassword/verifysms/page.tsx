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
import { useForm } from "react-hook-form";
import NormalInput from "@/components/FormCompsV2/NormalInput";
import PhoneInputShow from "@/components/FormCompsV2/PhoneInputShow";
import PhoneInput from "@/components/FormCompsV2/PhoneInput";
import SelectInput from "@/components/FormCompsV2/SelectInput";
export default function Layout({}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      phone: "",
      job: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  });

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
      toast.error("Please check all fields");
      isRequesting(false);
    } else {
    }
  }
  const exec_otp = async (data: any) => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: data.username,
      phone: data.phone,
      job: data.job,
    });

    let response = await fetch(`${base_url}/api/post/sms`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let returned = await response.text();
    const parsed = JSON.parse(returned);
    if (parsed.code == 200) {
      toast.success(parsed.message);
      setUsername("");
      setPhone("");
      isRequesting(true);
      isRequesting(false);
      setLocal(parsed.OTP);
      router.push(
        `/forgotpassword/validateotp?username=${data.username}&phone=${data.phone}&job=${data.job}`
      );
    } else {
      toast.error(parsed.message);
      isRequesting(false);
    }
  };

  const onSubmit = (data: any) => {
    exec_otp(data);
  };

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
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <NormalInput
                name="username"
                label="Username"
                register={register}
                errors={errors}
                required={true}
                type={"text"}
                validationSchema={{ required: "This field is required" }}
              ></NormalInput>
              <PhoneInput
                name="phone"
                label="Phone Number"
                register={register}
                errors={errors}
                required={true}
                type={"number"}
                validationSchema={{
                  required: "This field is required",
                  pattern: {
                    value: /^9\d{9}$/,
                    message:
                      "Valid password should start with 9,all numbers, and 10 character long.",
                  },
                }}
              ></PhoneInput>

              <SelectInput
                name={"job"}
                label={"Job"}
                register={register}
                errors={errors}
                required={true}
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
                validationSchema={{ required: "This field is required" }}
              ></SelectInput>

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
