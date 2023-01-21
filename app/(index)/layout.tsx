"use client";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import getCompany from "../components/getCompany";
import Navbar from "../components/Navbar/navbar";
import { useEffect, useState } from "react";
import ScrollStack from '../components/TechStack/ScollStack'
import Footer from "../components/Footer/footer";
import Head from './head'
import Script from 'next/script'
import SkeletonLoader from "../components/Loading/skeletonLoader";
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
    <html className="overflow-x-hidden overflow-y-scroll h-screen w-screen lg:overflow-y-auto bg-base-200">
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
        <Navbar loads={loading.data}></Navbar>
        {children}
        <ScrollStack ></ScrollStack>
        <Footer></Footer>
      </body>
      <Script src="/sw.js"></Script>
    </html>
  );
}
