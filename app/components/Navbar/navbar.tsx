"use client";
import Image from "next/image";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Navbar() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">RVM Hog Farm</a>
        </div>
        <div className=" w-full flex">
          <select
            data-choose-theme
            className="select select-bordered bg-neutral hidden max-w-xs ml-auto mr-4"
          >
            <option disabled>Theme</option>
            <option value="">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </>
  );
}
