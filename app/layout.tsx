"use client";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Page from "./page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState();
  return (
    <html data-theme={theme}>
      <head />
      <body>{children}</body>
    </html>
  );
}
