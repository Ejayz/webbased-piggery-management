"use client";

import Link from "next/link";
import { lazy, useEffect, useState } from "react";
import Navbar from "./(components)/(Navbar)/navbar";
import getCompany from "./(components)/getCompany";

export default function Page({ information }: any) {
  const loading = getCompany();

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
                  <Link href="#" as={"/forgotpassword"}>
                    Forgot password?
                  </Link>
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
