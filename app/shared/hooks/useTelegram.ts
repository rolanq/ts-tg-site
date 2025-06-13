"use client";
import { useEffect, useState } from "react";
import { TelegramUser } from "../types/telegram";

const isTelegramWebAppInitialized = () => {
  return typeof window !== "undefined" && window.Telegram?.WebApp;
};

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isTelegramWebAppInitialized()) {
      return;
    }

    try {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.bottomBarColor = "#ffffff";
      window.Telegram.WebApp.headerColor = "#ffffff";

      if (window.Telegram.WebApp.initDataUnsafe?.user) {
        setUser(window.Telegram.WebApp.initDataUnsafe.user);
      }

      setIsReady(true);
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", error);
    }
  }, []);

  return {
    user,
    isReady,
    webApp: isTelegramWebAppInitialized() && window.Telegram.WebApp,
  };
};
