"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    WebApp.ready();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
