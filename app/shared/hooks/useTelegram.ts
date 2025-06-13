"use client";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { TelegramUser } from "../types/telegram";

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    WebApp.ready();
    WebApp.bottomBarColor = "#ffffff";
    WebApp.headerColor = "#ffffff";
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser(WebApp.initDataUnsafe.user);
      setIsReady(true);
    }
  }, []);

  return {
    user,
    isReady,
    webApp: WebApp,
  };
};
