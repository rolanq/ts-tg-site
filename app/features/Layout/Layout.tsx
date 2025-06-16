"use client";
import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { AddAdProvider } from "../AddAd/context/AddAdContext";
import { AllAdsProvider } from "@/app/context/AllAdsContext";
import { UsersAdsProvider } from "@/app/context/UsersAdsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <AddAdProvider>
        <AllAdsProvider>
          <UsersAdsProvider>
            <div className={styles.layout}>{children}</div>
            <Footer />
          </UsersAdsProvider>
        </AllAdsProvider>
      </AddAdProvider>
    </main>
  );
}
