"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/get/company");
      const data = await response.text();
      setData(JSON.parse(data).company);
    };
    fetchData();
  }, []);
  if (data == null) {
    
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">{data}</a>
      </div>
    </>
  );
}
