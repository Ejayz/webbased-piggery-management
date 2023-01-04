"use client";
import { useEffect, useState } from "react";
import Loading from "../(Loading)/loading";

export default function Navbar({ company }: any) {
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">{company}</a>
      </div>
    </>
  );
}
