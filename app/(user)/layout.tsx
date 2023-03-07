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
import Head from "../(index)/head";
import { usePathname } from "next/navigation";
import { themeChange } from "theme-change";
import Footer from "@/components/Footer/footer";

export default function User({ children }: { children: React.ReactNode }) {
  const loading = getUserInfo();
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const [Logout, setLogout] = useState<boolean>(false);
  const [owner, isOwner] = useState<boolean>(false);
  const [title, setTitle] = useState("RVM Hog Farm");
  const path = usePathname();
  useEffect(() => {
    if (path?.includes("user_management")) {
      setTitle("RVM Hog Farm-User Management");
    } else if (path?.includes("dashboard")) {
      setTitle("RVM Hog Farm-Dashboard");
    } else if (path?.includes("manage_cage")) {
      setTitle("RVM Hog Farm-Cage Management");
    } else if (path?.includes("manage_pig")) {
      setTitle("RVM Hog Farm-Manage Pig");
    }
  }, [path]);

  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    async function removeAuth() {
      if (Logout) {
        document.cookie =
          "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;maxAge=-1";
        if (!document.cookie.includes("auth")) {
          toast.success("Successfully logged out. Bye...");
          setTimeout(() => {
            window.open("/", "_self");
          }, 4000);
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
        <html data-theme="light">
          <Head title={"Please wait..."}></Head>
          <body>{loading.loader}</body>
        </html>
      </>
    );
  }

  return (
    <html data-theme="light" className="overflow-x-hidden overflow-y-auto">
      <Head title={title}></Head>
      <body>
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
        <div className="navbar bg-neutral text-neutral-content">
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
            <a className="btn btn-ghost normal-case text-xl">RVM Hog Farm</a>
          </div>
          {/* Theme Changer */}
          <div className=" w-full flex">
            <select
              data-choose-theme
              className="select select-bordered bg-neutral hidden max-w-xs ml-auto mr-4"
            >
              <option disabled>Theme</option>
              <option value="">Default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content h-full w-full overflow-x-hidden bg-base-100">
            {/* Content */}
            <div className="h-auto overflow-y-auto overflow-x-hidden lg:overflow-hidden bg-base-100 w-screen">
              {children}
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              <div className="text-base font-medium">
                <li>
                  <Link href="/dashboard">
                    <Image
                      src={"/assets/icons/dashboard.png"}
                      className="h-5 w-5 hidden"
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
                <div
                  tabIndex={0}
                  className="collapse collapse-plus rounded-md bg-base-100"
                >
                  <div className="collapse">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/user_management.png"}
                        className="h-6 w-6 mr-2 my-auto hidden"
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage User
                    </div>
                    <div className="collapse-content">
                      <li>
                        <Link href="/user_management/owner/Create">
                          <Image
                            src={"/assets/icons/create_user.png"}
                            className="h-6 w-6 hidden"
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </Link>
                      </li>
                      <li>
                        <Link href="/user_management/owner/List">
                          <Image
                            src={"/assets/icons/user_list.png"}
                            className="h-6 w-6 hidden"
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          User List
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cage Management */}
              <div
                className={`${
                  loading.data.job == "worker" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Cage
                  </div>
                  <div className="collapse-content">
                    <li>
                      <Link href="/cage_management/worker/Create">
                        <Image
                          src={"/assets/icons/create_user.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link href="/cage_management/worker/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Cage List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of cage management menu */}
              {/* Pig Management */}
              <div
                className={`${
                  loading.data.job == "worker" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Pig
                  </div>
                  <div className="collapse-content">
                    <div className="collapse">
                      <input type="checkbox" />
                      <div className="collapse-title text-base flex flex-cols font-medium">
                        <Image
                          src={"/assets/icons/user_management.png"}
                          className="h-6 w-6 mr-2 my-auto hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </div>
                      <div className="collapse-content">
                        <li>
                          <Link href="/pig_management/worker/Create/Pigs">
                            <Image
                              src={"/assets/icons/create_user.png"}
                              className="h-6 w-6 hidden"
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Pigs
                          </Link>
                        </li>
                        <li>
                          <Link href="/pig_management/worker/Create/Breeder">
                            <Image
                              src={"/assets/icons/user_list.png"}
                              className="h-6 w-6 hidden"
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Breeder
                          </Link>
                        </li>
                      </div>
                    </div>
                    <li>
                      <Link href="/pig_management/worker/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Pig List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of Pig management menu */}
              {/* Breed Management */}
              <div
                className={`${
                  loading.data.job == "worker" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Breed
                  </div>
                  <div className="collapse-content">
                    <li>
                      <Link href="/breed_management/worker/Create">
                        <Image
                          src={"/assets/icons/create_user.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link href="/breed_management/worker/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Breed List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of Breed management menu */}
              {/* Inventory Management */}
              <div
                className={`${
                  loading.data.job == "worker" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Inventory
                  </div>
                  <div className="collapse-content">
                    <li>
                      <Link href="/inventory_management/worker/Create">
                        <Image
                          src={"/assets/icons/create_user.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link href="/inventory_management/worker/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Inventory List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of Inventory management menu */}
              {/* Reorder Management */}
              <div
                className={`${
                  loading.data.job == "worker" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Reorder
                  </div>
                  <div className="collapse-content">
                    <li>
                      <Link href="/reorder_management/worker/Create">
                        <Image
                          src={"/assets/icons/create_user.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link href="/reorder_management/worker/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Reorder List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of Reorder management menu */}
              {/* Reorder Management */}
              <div
                className={`${
                  loading.data.job == "owner" ? "block" : "hidden"
                }`}
              >
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-base flex flex-cols font-medium">
                    <Image
                      src={"/assets/icons/user_management.png"}
                      className="h-6 w-6 mr-2 my-auto hidden"
                      alt={""}
                      height={512}
                      width={512}
                    ></Image>
                    Manage Reorder
                  </div>
                  <div className="collapse-content">
                    <li>
                      <Link href="/reorder_management/owner/Create">
                        <Image
                          src={"/assets/icons/create_user.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link href="/reorder_management/owner/List">
                        <Image
                          src={"/assets/icons/user_list.png"}
                          className="h-6 w-6 hidden"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Reorder List
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              {/* End of Reorder management menu */}
              <div className="font-medium text-base">
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      setLogout(!Logout);
                    }}
                  >
                    <Image
                      src={"/assets/icons/pig.png"}
                      className="h-5 w-5 hidden"
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
      </body>
    </html>
  );
}
