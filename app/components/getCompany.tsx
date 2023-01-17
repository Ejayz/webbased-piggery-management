"use client";
import { useState, useEffect } from "react";
import Loading from "./Loading/loading";

export default function getCompany() {
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
    return {
      loading: true,
      data: "",
      loads: <Loading></Loading>,
    };
  }
  return {
    loading: false,
    data: data,
  };
}
