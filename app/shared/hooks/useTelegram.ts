"use client";
import { useEffect, useState } from "react";
import { TelegramUser } from "../types/telegram";
import createUser from "@/app/services/Users";

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
      if (window.Telegram.WebApp.initDataUnsafe?.user) {
        setUser(window.Telegram.WebApp.initDataUnsafe.user);
      }

      setIsReady(true);
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      createUser(user);
    }
  }, [user]);

  return {
    user,
    isReady,
    webApp: isTelegramWebAppInitialized() && window.Telegram.WebApp,
  };
};
