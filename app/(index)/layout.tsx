"use client";
import { ToastContainer } from "react-toastify";
import "@/style/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/app/components/Navbar/navbar";
import { useEffect } from "react";
import Footer from "@/app/components/Footer/footer";
import Head from "./head";
import { Suspense } from "react";
import Loading from "@/app/components/Loading/loading";
import getErrorCode from "@/hooks/getErrorCode";
import { NextUIProvider } from "@nextui-org/react";
import { themeChange } from "theme-change";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  getErrorCode();

  useEffect(() => {
    themeChange(false);
  });

  useEffect(() => {
    async function getSession() {
      if (document.cookie.includes("auth")) {
        open("/dashboard", "_self");
      }
    }
    getSession();
  }, []);

  return (
    <>
      <html
        data-theme
        className="overflow-x-hidden overflow-y-scroll h-screen w-screen lg:overflow-y-auto bg-base-200"
      >
        <Head title={"Login"}></Head>
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
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </body>
        {/* <Script src="/sw.js"></Script> */}
      </html>
    </>
  );
}
