"use client";
import { ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import React from "react";
import getUserInfo from "../(components)/getUserInfo";
import ErrorBoundary from "../(components)/(ErrorBoundery)/ErrorBoundery";
import getCompany from "../(components)/getCompany";

export default function User({ children }: { children: React.ReactNode }) {
  const loading = getUserInfo();
  const getComp = getCompany();
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  if (loading.loading || getComp.loading) {
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
        <ErrorBoundary>
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
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">
                {getComp.data}
              </a>
            </div>
            <div className="flex-none">
              Welcome back {loading.data.last_name} ,{loading.data.first_name}
              {loading.data.middle_name}
            </div>
          </div>
          <div className="flex flex-row h-full">
            {/* Menu */}
            <div
              className={`drawer-side ${
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
                  <div className={`drawer-side h-full`}>
                    <label
                      htmlFor="my-drawer"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-100 w-56 p-2 ">
                      <div>
                        <li>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            Item 2
                          </a>
                        </li>
                      </div>
                      <div></div>

                      <li>
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Item 1
                        </a>
                      </li>
                      <li>
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          Item 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Contents  */}
            <div className="h-full overflow-x-auto w-full">{children} </div>
          </div>
        </ErrorBoundary>
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
