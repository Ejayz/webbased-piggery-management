"use client"
import { Suspense } from "react";
import "../styles/globals.css";
import Loading from "./(components)/(Loading)/loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <Suspense fallback={<Loading />}>
        <body>{children}</body>
      </Suspense>
    </html>
  );
}
