"use client";

import { createContext } from "react";
import { TelegramUser } from "./shared/types/telegram";
import WebApp from "@twa-dev/sdk";
import { useTelegram } from "./shared/hooks/useTelegram";

interface TelegramContextType {
  user: TelegramUser | null;
  isReady: boolean;
  webApp: typeof WebApp | null;
}

const defaultContext: TelegramContextType = {
  user: null,
  isReady: false,
  webApp: null,
};

export const telegramContext =
  createContext<TelegramContextType>(defaultContext);

const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isReady, webApp } = useTelegram();

  return (
    <telegramContext.Provider value={{ user, isReady, webApp }}>
      {children}
    </telegramContext.Provider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <TelegramProvider>{children}</TelegramProvider>;
}
