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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  getErrorCode();

  useEffect(() => {
    async function getSession() {
      if (document.cookie.includes("auth")) {
        open("/dashboard", "_self");
      }
    }
    getSession();
  }, []);

  return (
    <html className="overflow-x-hidden overflow-y-scroll h-screen w-screen lg:overflow-y-auto bg-base-200">
      <Head title={"Login"}></Head>
      <body>
        <Suspense fallback={<Loading></Loading>}>
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
        </Suspense>
      </body>
      {/* <Script src="/sw.js"></Script> */}
    </html>
  );
}
