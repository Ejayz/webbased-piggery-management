"use client";

import { lazy, useEffect, useState } from "react";
import Navbar from "./(components)/(Navbar)/navbar";

export default function Page({ information }: any) {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get/company");
      const data = await response.text();
      if (response.ok) {
        setLoading(false);
        setData(JSON.parse(data).company);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <>
        <div className="mockup-window border w-screen h-screen bg-base-300">
          <div className="flex justify-center w-full h-full px-4 py-16 bg-base-200">
            <p className="text-center my-auto text-2xl animate-ping">
              {" "}
              Please wait...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar company={data}></Navbar>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Piggery management with seemlessly easy to use piggery management
              system
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">No account? </h1>
            <p className="py-6">
              Contact server administrator for your account!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
