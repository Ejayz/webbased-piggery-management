"use client";
import { useEffect, useState } from "react";
import Loading from "./(Loading)/loading";
import searchCookie from "./cookieParser";
import jwt from "jsonwebtoken";
export default function getUserInfo() {
  const [loading, isLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function getTokens() {
      isLoading(true);
      const cookie: string = document.cookie;
      const data = searchCookie(cookie, "auth");
      if (data == null) {
        window.open("/?error=401", "_self");
      } else {
        setData(jwt.decode(data));
        isLoading(false);
      }
    }
    getTokens();
  }, []);
  if (loading) {
    return {
      loading: true,
      loader: <Loading></Loading>,
    };
  }
  return {
    loading: false,
    data: data,
  };
}
