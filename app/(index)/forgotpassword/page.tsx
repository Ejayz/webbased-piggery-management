"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../(components)/(Navbar)/navbar";
import getCompany from "../../(components)/getCompany";

export default function Page() {
  const loading = getCompany();

  //Load loading UI
  if (loading.loading) {
    return loading.loads;
  }

  return (
    <>
      <Navbar loads={loading.data}></Navbar>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-row lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Forgot Password?</h1>
            <p className="py-6">
              Reset your password by providing your username and phone number to
              recieve OTP.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Username</span>
                </label>
                <label className="input-group">
                  <span>Username</span>
                  <input
                    type="text"
                    placeholder="ex.Juan_123"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <label className="input-group">
                  <span> (+63)</span>
                  <input
                    type="text"
                    placeholder="ex.9123456789"
                    className="input input-bordered"
                  />
                </label>
                <label className="label">
                  <Link
                    href="#"
                    as={"/"}
                    className="label-text-alt link link-hover"
                  >
                    Remembered your password? Login.
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary loading"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
