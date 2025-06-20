"use client";
import { useEffect, useState } from "react";
import { TelegramUser } from "../types/telegram";

const defaultUser: TelegramUser = {
  id: 359039145,
  first_name: "Rolan",
  last_name: "Oyun",
  username: "rolan_oyun",
  is_bot: false,
  is_premium: false,
  photo_url:
    "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
};

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
      window.Telegram.WebApp.expand();

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
