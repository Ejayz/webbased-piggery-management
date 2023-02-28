"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
export default function PageNotFound() {
  const path = usePathname();
  return (
    <>
      <div
        className="w-full h-screen overflow-hidden text-base-content flex flex-row"
        data-theme="dark"
      >
        <div className="mx-auto my-auto flex flex-col md:flex-row">
          <div className="flex flex-col">
            <Image
              src={"/assets/icons/link-broken.svg"}
              alt={""}
              height={100}
              width={100}
              className="W-20 mx-auto h-20"
            ></Image>
            <span className="my-auto w-full md:mx-0 mx-auto text-center text-base-content uppercase text-2xl">
              404 Not Found
            </span>
          </div>
          <div className="flex">
            <span className="my-auto">
              You are accessing a broken link or not available page.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
