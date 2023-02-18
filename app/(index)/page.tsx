"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { VerifyUser } from "@/hooks/useLogin";
import { Input } from "@nextui-org/react";
import NextInput from "@/components/FormComponents/NextInput";

export default function Page() {
  //Create states for username password and remember me
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember_me, setRemember] = useState<boolean>(false);
  const [requesting, isRequesting] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const ValidateLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username == "" || password == "") {
      toast.error("All feilds are required");
      return false;
    }
    exec_login();
  };

  const exec_login = async () => {
    const returned = await VerifyUser(username, password, remember_me);
    if (returned.code == 200) {
      toast.success(returned.message);
      router.push("/dashboard");
    } else {
      toast.error(returned.message);
    }
  };

  return (
    <>
      <div className="hero bg-base-content h-screen">
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

          <form
            onSubmit={ValidateLogin}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
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
                  className="input input-bordered text-base-content"
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
                    className="input text-base-content input-bordered w-full"
                  />
                  <button
                    type="button"
                    name="showpassword"
                    data-tip={showPassword ? "Hide password" : "Show password"}
                    className={`btn tooltip btn-square flex  ${
                      showPassword ? "eyes-slash" : "eyes"
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={"show/hide password"}
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
                <label className="label label-text">
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
