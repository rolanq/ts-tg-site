"use client";
import { useEffect, useState } from "react";
import { TelegramUser } from "../types/telegram";
import createUser from "@/app/services/Users";

const isTelegramWebAppInitialized = () => {
  return typeof window !== "undefined" && window.Telegram?.WebApp;
};

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>({
    id: 359039145,
    first_name: "test",
    last_name: "test",
    username: "test",
    language_code: "en",
  });
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
