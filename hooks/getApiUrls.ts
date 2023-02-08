"use client";

import { useEffect, useState } from "react";
/** This hook accepts string named routes: Remember to not append /api/ as it is already added. */
export default async function ApiUrlGenerator(routes: String) {
  const [origin, setOrigin] = useState("");
  const [api_link, setApiLink] = useState("");
  useEffect(() => {
    async function getOrigin() {
      setOrigin(location.origin);
    }
    getOrigin();
  }, []);
  useEffect(() => {
    async function createApiUrl() {
      setApiLink(origin + "/api" + routes);
    }
    createApiUrl();
  }, [origin !== ""]);

  if (api_link == "") {
    return "waiting";
  } else {
    return api_link;
  }
}
