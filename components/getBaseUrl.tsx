"use client";
import { useEffect, useState } from "react";

export default function baseUrl() {
  const [base_url, setBaseUrl] = useState<string>();

  useEffect(() => {
    async function getBaseURL() {
      setBaseUrl(location.origin);
    }
    getBaseURL();
  });
  return base_url;
}
