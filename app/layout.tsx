import "./globals.css";
import { Noto_Sans } from "next/font/google";

export const metadata = {
  title: "В Касание",
  description: "Продай машину в касание",
};

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
