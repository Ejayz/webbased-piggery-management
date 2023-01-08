"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { lazy, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../(components)/(Navbar)/navbar";
import getCompany from "../(components)/getCompany";
import Image from "next/image";

export default function Page() {
  //Create states for username password and remember me
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember_me, setRemember] = useState<boolean>(false);
  const [requesting, isRequesting] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [base_url, setBaseUrl] = useState<string>();

  useEffect(() => {
    async function getBaseURL() {
      setBaseUrl(location.origin);
    }
    getBaseURL();
  });

  const VerifyUser = async () => {
    if (username == "" || password == "") {
      toast.error("Username/Password is required");
      return;
    }
    isRequesting(true);
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: username,
      password: password,
      remember_me: remember_me,
    });

    let response = await fetch(`${base_url}/api/post/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    if (response.ok) {
      isRequesting(false);
    }
    const parsed = JSON.parse(data);

    if (parsed.code == 200) {
      toast.success(parsed.message);
      router.push("/dashboard");
    } else {
      isRequesting(false);
      toast.error(parsed.message);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Now!</h1>
            <p className="py-6">
              Piggery Management System that is easy to use
            </p>
            <h1 className="text-5xl font-bold">No account? </h1>
            <p className="py-6">
              Contact server administrator for your account!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
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
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="input-group">
                  <input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button
                    data-tip={showPassword ? "Hide password" : "Show password"}
                    className={`btn tooltip btn-square flex  ${
                      showPassword ? "eyes-slash" : "eyes"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></button>
                </div>
                <div
                  className="form-control tooltip"
                  data-tip="You will not be logged out for 30 days."
                >
                  <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      checked={remember_me}
                      type="checkbox"
                      value="false"
                      onChange={(e) => {
                        setRemember(e.target.checked);
                      }}
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
                <label className="label">
                  <Link href="#" as={"/forgotpassword"}>
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6 ">
                <button
                  type="submit"
                  disabled={requesting}
                  className={`btn btn-primary  ${requesting ? "loading" : ""}`}
                  onClick={VerifyUser}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
