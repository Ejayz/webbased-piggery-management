"use client";

import { verify } from "crypto";
import Link from "next/link";
import { lazy, useEffect, useState } from "react";
import Navbar from "./(components)/(Navbar)/navbar";
import getCompany from "./(components)/getCompany";

export default function Page({ information }: any) {
  //Prep Navigation Bar
  const loading = getCompany();
  //Create states for username password and remember me
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [remember_me, setRemember] = useState<boolean>(false);
  const [requesting, isRequesting] = useState<boolean>(false);

  //Request to verify user
  const VerifyUser = async () => {
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

    let response = await fetch("http://localhost:3000/api/post/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    if (response.ok) {
      isRequesting(false);
    }
    console.log(data);
  };

  //Load company name in navigation bar
  if (loading.loading) {
    return loading.loads;
  }
  return (
    <>
      <Navbar loads={loading.data}></Navbar>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Piggery management with seemlessly easy to use piggery management
              system
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
                <input
                  value={password}
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                />
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
                      onChange={(e) => setRemember(e.target.checked)}
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
