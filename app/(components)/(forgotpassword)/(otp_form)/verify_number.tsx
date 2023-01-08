"use state";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Layout({ setText, setData, setOTP, setOTPData }: any) {
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
      const parsed = JSON.parse(data);
      if (parsed.code == 200) {
        toast.success(parsed.message);
        setOTPData(parsed.OTP);
        setData(2);
      } else {
        toast.error(parsed.message);
      }
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="py-6 ml-4">
            <ul className="list-disc">
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
            </ul>
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
                GET OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
