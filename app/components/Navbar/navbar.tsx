"use client";
import { useEffect, useState } from "react";
import Loading from "../Loading/loading";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">RVM Hog Farm</a>
        </div>
      </div>
    </>
  );
}
