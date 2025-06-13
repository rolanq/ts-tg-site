import Script from "next/script";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { Telegram } from "@twa-dev/types";
import { TelegramProvider } from "./providers/TelegramProvider";

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

export default function RootLayout({
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
      </head>
      <body className={notoSans.className}>
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
