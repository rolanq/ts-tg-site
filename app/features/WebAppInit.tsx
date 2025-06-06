"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

export default function WebAppInit() {
  useEffect(() => {
    WebApp.ready();
    WebApp.bottomBarColor = "#ffffff";
    WebApp.headerColor = "#ffffff";
  }, []);

  return null;
}
