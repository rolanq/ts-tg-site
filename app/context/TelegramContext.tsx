"use client";
import React, { createContext, useEffect, useState } from "react";
import { useTelegram } from "../shared/hooks/useTelegram";

export const telegramContext = createContext<ReturnType<typeof useTelegram>>({
  user: null,
  isReady: false,
  webApp: null as any,
});

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const telegram = useTelegram();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <telegramContext.Provider value={telegram}>
      {children}
    </telegramContext.Provider>
  );
}
