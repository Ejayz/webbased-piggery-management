"use client";
import { useEffect, useState } from "react";
import Loading from "../(Loading)/loading";

export default function Navbar() {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get/company");
      const data = await response.text();
      if (response.ok) {
        setLoading(false);
        setData(JSON.parse(data).company);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <>
         <div className="navbar bg-base-100">
        <a className="btn animate-pulse btn-ghost normal-case text-xl">[Fetching Company Name]</a>
      </div>
      </>
    );
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">{data}</a>
      </div>
    </>
  );
}
