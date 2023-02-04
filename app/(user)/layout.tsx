"use client";
import { toast, ToastContainer } from "react-toastify";
import "@/style/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import getUserInfo from "@/app/components/getUserInfo";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/components/Loading/loading";

export default function User({ children }: { children: React.ReactNode }) {
  const loading = getUserInfo();
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const [Logout, setLogout] = useState<boolean>(false);
  const [owner, isOwner] = useState<boolean>(false);
  useEffect(() => {
    async function removeAuth() {
      if (Logout) {
        document.cookie =
          "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;maxAge=-1";
        if (!document.cookie.includes("auth")) {
          toast.success("Successfully logged out. Bye...");
          window.open("/", "_self");
        } else {
          toast.error("Something went wrong while removing this session.");
        }
      }
    }
    removeAuth();
  }, [Logout]);

  if (loading.loading) {
    return (
      <>
        <html>
          <body>{loading.loader}</body>
        </html>
      </>
    );
  }

  return (
    <html className="overflow-hidden">
      <body>
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label
              onClick={() => setToggleMenu(!toggleMenu)}
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex lg:ml-4 mx-auto   ">
            <a className="btn btn-ghost normal-case text-xl">RVM Hog Farm</a>
          </div>
          <div className="flex-none"></div>
        </div>
        <div className="flex flex-row w-screen h-screen">
          {/* Menu */}
          <div
            className={`drawer-side  ${
              toggleMenu ? "hidden" : "block "
            } h-full`}
          >
            <div className={`drawer-mobile   h-full`}>
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle hidden"
                />
                <div className={`drawer-content  h-full`}></div>
                <div className={`drawer-side  h-full`}>
                  <label
                    htmlFor="my-drawer"
                    className="drawer-overlay "
                  ></label>
                  <ul className="menu bg-base-100 w-56 p-2 ">
                    <div>
                      <li>
                        <Link href="/dashboard">
                          <Image
                            src={"/assets/icons/dashboard.png"}
                            className="h-5 w-5"
                            alt={""}
                            width={512}
                            height={512}
                          ></Image>
                          Dashboard
                        </Link>
                      </li>
                    </div>
                    <div
                      className={`${
                        loading.data.job == "owner" ? "block" : "hidden"
                      }`}
                    >
                      <li>
                        <Link href="/user_management">
                          <Image
                            src={"/assets/icons/user_management.png"}
                            className="h-5 w-5"
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Manage User
                        </Link>
                      </li>
                    </div>
                    <div>
                      <li>
                        <Link href="/manage_pig">
                          <Image
                            src={"/assets/icons/pig.png"}
                            className="h-5 w-5"
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Manage Pig
                        </Link>
                      </li>
                    </div>
                    <div>
                      <li>
                        <Link
                          href="#"
                          onClick={() => {
                            setLogout(!Logout);
                          }}
                        >
                          <Image
                            src={"/assets/icons/pig.png"}
                            className="h-5 w-5"
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Logout
                        </Link>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Contents  */}
          <Suspense fallback={<Loading></Loading>}>
            <div className="h-screen  overflow-y-scroll overflow-x-hidden w-full">
              {children}
            </div>
          </Suspense>
        </div>
        {/* Toast */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
