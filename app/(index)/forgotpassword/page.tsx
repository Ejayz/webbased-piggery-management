"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../(components)/(Navbar)/navbar";
import getCompany from "../../(components)/getCompany";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  async function getOTP() {
    if (username == "" || phone == "") {
      toast.error("Username/Phone number should not be empty");
    }
    if (!phone.includes("+63")) {
      toast.error("Phone number is invalid. It should start at (+63)");
    } else {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        username: username,
        phone: phone,
      });

      let response = await fetch("http://localhost:3000/api/post/sms", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      let data = await response.text();
      console.log(data);
    }
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Forgot password</h1>
            <p className="py-6">
              Enter your username and phone number to recieve OTP
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
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="(+63)9123456789"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link
                    href="#"
                    as="/"
                    className="label-text-alt link link-hover"
                  >
                    Remembered your password? Login
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={getOTP} className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
