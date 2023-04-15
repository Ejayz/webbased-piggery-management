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
      <div className="navbar text-base-content bg-white w-full h-1/12">
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
            <li className="font-bold" tabIndex={0}>
              <a>
                About
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Team</a>
                </li>
                <li>
                  <a>Hog Farm</a>
                </li>
              </ul>
            </li>
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
