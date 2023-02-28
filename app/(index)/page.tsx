"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { VerifyUser } from "@/hooks/useLogin";
import Image from "next/image";
import SelectBox from "@/components/FormComponents/selectBox";
import { validateSelect } from "@/hooks/useValidation";

export default function Page() {
  //Create states for username password and remember me
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember_me, setRemember] = useState<boolean>(false);
  const [job, setJob] = useState("default");
  const [isJob, setIsJob] = useState(true);
  const [requesting, isRequesting] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const ValidateLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username == "" || password == "") {
      toast.error("All feilds are required");
      return false;
    }
    if (job == "default") {
      toast.error("Please select a job");
      return false;
    }
    isRequesting(true);
    exec_login();
  };

  const exec_login = async () => {
    const returned = await VerifyUser(username, password, remember_me, job);
    if (returned.code == 200) {
      toast.success(returned.message);
      router.push("/dashboard");
      isRequesting(false);
    } else {
      isRequesting(false);
      toast.error(returned.message);
    }
  };

  return (
    <>
      <div className="hero bg-base-100 h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-base-content font-bold">Login Now!</h1>
            <p className="py-6 text-base-content">
              Piggery Management System that is easy to use
            </p>
            <h1 className="text-5xl text-base-content font-bold">
              No account?{" "}
            </h1>
            <p className="py-6 text-base-content">
              Contact server administrator for your account!
            </p>
          </div>

          <form
            onSubmit={ValidateLogin}
            className="card flex-shrink-0 w-full bg-primary-content max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <div data-theme="light" className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  placeholder="username"
                  className="input input-bordered text-base-content"
                />
              </div>
              <div data-theme="light" className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group">
                  <input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input text-base-content input-bordered w-full"
                  />
                  <button
                    type="button"
                    name="showpassword"
                    className={`btn tooltip btn-square bg-base-200 flex  `}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={"show/hide password"}
                  >
                    {!showPassword ? (
                      <Image
                        src={`/assets/icons/eye-slash-solid.svg`}
                        alt={"eyes"}
                        className="w-6 h-6"
                        width={576}
                        height={512}
                      ></Image>
                    ) : (
                      <Image
                        src={`/assets/icons/eye-solid.svg`}
                        alt={"eyes"}
                        className="w-6 h-6"
                        width={576}
                        height={512}
                      ></Image>
                    )}
                  </button>
                </div>
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
                  <Link href="#" as={"/forgotpassword/verifysms"}>
                    Forgot password?
                  </Link>
                </label>
                <div
                  className="form-control  tooltip"
                  data-tip="You will not be logged out for 30 days."
                >
                  <label className="label justify-start flex cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      checked={remember_me}
                      type="checkbox"
                      value="false"
                      onChange={(e) => {
                        setRemember(e.target.checked);
                      }}
                      className="checkbox ml-4 checkbox-primary"
                    />
                  </label>
                </div>
              </div>
              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  disabled={requesting}
                  className={`btn btn-primary  ${
                    requesting ? "loading btn-seconday" : ""
                  }`}
                  aria-label="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
