"use state";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import getBaseURL from "../../getBaseUrl";
export default function Layout({
  setText,
  setData,
  setOTP,
  setOTPData,
  setUser,
  setNumber,
}: any) {
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const base_url = getBaseURL();
  const [requesting, isRequesting] = useState(false);

  async function getOTP() {
    isRequesting(true);
    if (username == "" || phone == "") {
      toast.error("Username/Phone number should not be empty");
      isRequesting(true);
    }
    if (!phone.includes("+63")) {
      toast.error("Phone number is invalid. It should start at (+63)");
      isRequesting(true);
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

      let response = await fetch(`${base_url}/api/post/sms`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      let data = await response.text();
      const parsed = JSON.parse(data);
      console.log(parsed)
      if (parsed.code == 200) {
        toast.success(parsed.message);
        setOTPData(parsed.OTP);
        setData(2);
        setUsername("");
        setPhone("");
        isRequesting(true);
        setUser(username);
        setNumber(phone);
      } else {
        toast.error(parsed.message);
        isRequesting(false);
      }
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Forgot password</h1>

          <ul className="list-disc ml-4">
            <li> Enter your username and phone number to recieve OTP</li>
            <li>Do not refresh or reload this page after recieving the OTP</li>
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
              <button
                disabled={requesting}
                onClick={getOTP}
                className={`btn btn-primary   ${requesting ? "loading" : ""}`}
              >
                GET OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}