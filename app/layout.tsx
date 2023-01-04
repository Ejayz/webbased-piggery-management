"use client";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Page from "./page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html>
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
