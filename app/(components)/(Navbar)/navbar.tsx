"use client";
import { useEffect, useState } from "react";
import Loading from "../(Loading)/loading";

export default function Navbar({ loads }: any) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">{loads}</a>
        </div>
      </div>
    </>
  );
}
