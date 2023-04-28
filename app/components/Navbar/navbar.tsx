"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Navbar() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className="navbar text-base-content bg-transparent w-full h-1/12">
        <div className="flex-none">
          <a className="btn btn-ghost normal-case text-base-content text-2xl">
            RVM Hog Farm
          </a>
        </div>
        <div className="flex-1">
          <ul className="menu menu-horizontal px-1">
            <li className="font-bold">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="font-bold" tabIndex={0}></li>
            <div className="divider divider-horizontal"></div>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
