import Script from "next/script";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { Telegram } from "@twa-dev/types";
import { TelegramProvider } from "./providers/TelegramProvider";
import ServerProvider from "./providers/ServerProvider";
import ToastProvider from "./providers/ToastProvider";

export const metadata = {
  title: "В Касание",
  description: "Продай машину в касание",
};

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="TelegramWebApp"
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={notoSans.className}>
        <TelegramProvider>
          <ToastProvider>{children}</ToastProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
