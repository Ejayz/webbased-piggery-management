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
import { usePathname, useRouter } from "next/navigation";
import { themeChange } from "theme-change";
import Footer from "@/components/Footer/footer";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import "react-calendar/dist/Calendar.css";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function User({ children }: { children: React.ReactNode }) {
  const loading = getUserInfo();
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const [Logout, setLogout] = useState<boolean>(false);
  const [owner, isOwner] = useState<boolean>(false);
  const [title, setTitle] = useState("RVM Hog Farm");
  const path = usePathname();
  const router = useRouter();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  const queryClient = new QueryClient();
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
    async function removeAuth() {
      if (Logout) {
        document.cookie =
          "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;maxAge=-1";
        if (!document.cookie.includes("auth")) {
          toast.success("Successfully logged out. Bye...");
          router.push("/login");
          setTimeout(() => {}, 4000);
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
          <Head title={"Please wait..."}></Head>
          <body>{loading.loader}</body>
        </html>
      </>
    );
  }

  return (
    <html className="overflow-x-hidden overflow-y-auto">
      <Head title={title}></Head>
      <body>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          canvasClassName={"z-0"}
          options={{
            background: {
              color: {
                value: "#ffffff",
              },
            },
            backgroundMask: {
              cover: {
                color: {
                  value: "#000000",
                },
                opacity: 0.5,
              },
            },

            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 0,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#00ffff",
              },
              links: {
                color: "#0000ff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1.5,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: false,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: true,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 10 },
              },
            },
            detectRetina: false,
          }}
        />
        <QueryClientProvider client={queryClient}>
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

          <div className="navbar text-primary-content bg-primary relative">
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
            <div className="flex-1 z-5">
              <a className="btn btn-ghost normal-case text-xl ">RVM Hog Farm</a>
            </div>

            <span className="px-2 text-2xl font-mono">
              {loading.data.user_name}
            </span>
            <div className="w-10 rounded-full">
              <img src="/assets/icons/user.svg" />
            </div>
          </div>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content h-full w-full overflow-x-hidden ">
              <div className="min-h-screen h-auto overflow-y-auto overflow-x-hidden  lg:overflow-hidden  w-screen  text-base-content">
                {children}
              </div>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                <div className="text-base font-medium hover:bg-base-300 rounded-md">
                  <li>
                    <label
                      onClick={() => {
                        setToggleMenu(!toggleMenu);
                        router.push("/dashboard");
                      }}
                      htmlFor="my-drawer"
                    >
                      <Image
                        src={"/assets/icons/dashboard.svg"}
                        className="h-5 w-5 "
                        alt={""}
                        width={512}
                        height={512}
                      ></Image>
                      Dashboard
                    </label>
                  </li>
                </div>

                <div
                  className={`${
                    loading.data.job == "owner" ? "block" : "hidden"
                  }`}
                >
                  <div
                    tabIndex={0}
                    className="collapse collapse-plus rounded-md bg-base-100 hover:bg-base-300"
                  >
                    <div className="collapse">
                      <input type="checkbox" />
                      <div className="collapse-title text-base flex flex-cols font-medium">
                        <Image
                          src={"/assets/icons/manage_user.svg"}
                          className="h-6 w-6 mr-2 my-auto"
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Manage User
                      </div>
                      <div className="collapse-content">
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/user_management/owner/Create");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/create.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Create
                          </label>
                        </li>
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/user_management/owner/List");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/list.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            User List
                          </label>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    loading.data.job == "owner" ? "block" : "hidden"
                  }`}
                >
                  <div
                    tabIndex={0}
                    className="collapse collapse-plus rounded-md bg-base-100 hover:bg-base-300"
                  >
                    <div className="collapse">
                      <input type="checkbox" />
                      <div className="collapse-title text-base flex flex-cols font-medium">
                        <Image
                          src={"/assets/icons/reports.svg"}
                          className="h-6 w-6 mr-2 my-auto "
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Reports
                      </div>
                      <div className="collapse-content">
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/reorder_report/owner/Create");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/reorder_list.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Reorder List
                          </label>
                        </li>{" "}
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/reports/InventoryReport");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/inventory_report.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Inventory Report
                          </label>
                        </li>
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push(
                                "/reports/MedicineAdministrationReport"
                              );
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/medicine_administration.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Medicine Adminstration Report
                          </label>
                        </li>
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/reports/VaccinationReport");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/vaccine_report.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Vaccination Report
                          </label>
                        </li>
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/reports/FeedingReport");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/feeding_report.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Feeding Report
                          </label>
                        </li>
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/reports/DewormingReport");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/deworm.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Deworming Report
                          </label>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    loading.data.job == "owner" ? "block" : "hidden"
                  }`}
                >
                  <div
                    tabIndex={0}
                    className="collapse collapse-plus rounded-md bg-base-100 hover:bg-base-300"
                  >
                    <div className="collapse">
                      <input type="checkbox" />
                      <div className="collapse-title text-base flex flex-cols font-medium">
                        <Image
                          src={"/assets/icons/backup_and_restore.svg"}
                          className="h-6 w-6 mr-2 my-auto "
                          alt={""}
                          height={512}
                          width={512}
                        ></Image>
                        Back Up And Restore
                      </div>
                      <div className="collapse-content">
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              open("/api/post/backup", "_blank");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/backup.svg"}
                              className="h-6 w-6 "
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Back Up
                          </label>
                        </li>{" "}
                        <li>
                          <label
                            onClick={() => {
                              setToggleMenu(!toggleMenu);
                              router.push("/BackUpAndRestore/Restore");
                            }}
                            htmlFor="my-drawer"
                          >
                            <Image
                              src={"/assets/icons/restore.svg"}
                              className="h-6 w-6"
                              alt={""}
                              height={512}
                              width={512}
                            ></Image>
                            Restore
                          </label>
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
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium ">
                      <Image
                        src={"/assets/icons/cage.svg"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Cage
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/cage_management/worker/Create");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/cage_management/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Cage List
                        </label>
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
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/pig.svg"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Pig Record
                    </div>
                    <div className="collapse-content">
                      <div className="collapse">
                        <input type="checkbox" />
                        <div className="collapse-title text-base flex flex-cols font-medium">
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 mr-2 my-auto "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </div>
                        <div className="collapse-content">
                          <li>
                            <label
                              onClick={() => {
                                setToggleMenu(!toggleMenu);
                                router.push(
                                  "/pig_management/worker/Create/Pigs"
                                );
                              }}
                              htmlFor="my-drawer"
                            >
                              <Image
                                src={"/assets/icons/piglet.svg"}
                                className="h-6 w-6 "
                                alt={""}
                                height={512}
                                width={512}
                              ></Image>
                              Piglets
                            </label>
                          </li>
                          <li>
                            <label
                              onClick={() => {
                                setToggleMenu(!toggleMenu);
                                router.push(
                                  "/pig_management/worker/Create/Breeder"
                                );
                              }}
                              htmlFor="my-drawer"
                            >
                              <Image
                                src={"/assets/icons/breeder.svg"}
                                className="h-6 w-6 "
                                alt={""}
                                height={512}
                                width={512}
                              ></Image>
                              Breeder
                            </label>
                          </li>
                        </div>
                      </div>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/pig_management/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Pig List
                        </label>
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
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/breed.png"}
                        className="h-6 w-6 mr-2 my-auto"
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Breed
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/breed_management/worker/Create");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/breed_management/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Breed List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Breed management menu */}
                {/* Breed Management */}
                <div
                  className={`${
                    loading.data.job == "worker" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300 hover:rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/batch.png"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Batch
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/batch_management/worker/BreederList");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Breeder Batch List
                        </label>
                      </li>{" "}
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/batch_management/worker/PigletList");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Piglet Batch List
                        </label>
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
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/inventory.svg"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Inventory
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/inventory_management/worker/Create");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/inventory_management/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Inventory List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Inventory management menu */}

                {/* Stock Card Management Management */}
                <div
                  className={`${
                    loading.data.job == "worker" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/stack_card.png"}
                        className="h-6 w-6 mr-2 my-auto"
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Stock Card
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/StockCard/worker/Restock");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/restock.png"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Restock
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/StockCard/worker/Destock");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/destock.png"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Destock
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/StockCard/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Stock Card List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Stock Card management menu */}
                {/*Plan Management Management */}
                <div
                  className={`${
                    loading.data.job == "veterinarian" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium ">
                      <Image
                        src={"/assets/icons/plan.svg"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Plan
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Plan/veterinarian/FeedingPlan");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Plan management menu */}
                {/* Schedule Management */}
                <div
                  className={`${
                    loading.data.job == "worker" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/schedule.svg"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Schedule
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Schedule/worker/Create");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Schedule/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Schedule List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Schedule management menu */}
                {/* Schedule Management */}
                <div
                  className={`${
                    loading.data.job == "worker" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/operation.png"}
                        className="h-6 w-6 mr-2 my-auto"
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Operation
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Operation/worker/ListBatch");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Batch Operation List
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Operation/worker/ListCage");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Cage Operation List
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Operation/worker/ListIndividual");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Individual Operation List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Schedule management menu */}
                {/* Quarantine Management */}
                <div
                  className={`${
                    loading.data.job == "worker" ? "block" : "hidden"
                  }`}
                >
                  <div className="collapse hover:bg-base-300 rounded-md">
                    <input type="checkbox" />
                    <div className="collapse-title text-base flex flex-cols font-medium">
                      <Image
                        src={"/assets/icons/quarantine.png"}
                        className="h-6 w-6 mr-2 my-auto "
                        alt={""}
                        height={512}
                        width={512}
                      ></Image>
                      Manage Quarantine
                    </div>
                    <div className="collapse-content">
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Quarantine_Management/worker/Create");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/create.svg"}
                            className="h-6 w-6 ="
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Create
                        </label>
                      </li>
                      <li>
                        <label
                          onClick={() => {
                            setToggleMenu(!toggleMenu);
                            router.push("/Quarantine_Management/worker/List");
                          }}
                          htmlFor="my-drawer"
                        >
                          <Image
                            src={"/assets/icons/list.svg"}
                            className="h-6 w-6 "
                            alt={""}
                            height={512}
                            width={512}
                          ></Image>
                          Quarantine List
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                {/* End of Qurantine management menu */}
                <div className="font-medium text-base">
                  <li>
                    <Link
                      href="#"
                      onClick={() => {
                        setLogout(!Logout);
                      }}
                    >
                      <Image
                        src={"/assets/icons/logout.svg"}
                        className="h-6 w-6 "
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
        </QueryClientProvider>
      </body>
    </html>
  );
}
