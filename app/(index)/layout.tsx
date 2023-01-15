"use client";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import getCompany from "../(components)/getCompany";
import Navbar from "../(components)/(Navbar)/navbar";
import { useEffect, useState } from "react";
import { getCookieParser } from "next/dist/server/api-utils";
import getUserInfo from "../(components)/getUserInfo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const error = useSearchParams().get("error");
  //Load company name in navigation bar
  //Prep Navigation Bar
  const loading = getCompany();
  async function getError() {
    if (error == "401" && !loading.loading) {
      toast.error("Login first to access dashboard.");
    }
  }
  getError();

  useEffect(() => {
    async function getSession() {
      if (document.cookie.includes("auth")) {
        open("/dashboard", "_self")
      }
    }
    getSession()
  }, [])



  if (loading.loading) {
    return (
      <html className="overflow-x-scroll lg:overflow-hidden">
        <body>{loading.loads}</body>
      </html>
    );
  }

  return (
    <html className="overflow-x-scroll lg:overflow-hidden bg-base-200">
      <body>
        <Navbar loads={loading.data}></Navbar>
        {children}
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
