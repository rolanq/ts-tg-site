"use client";
import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { AddAdProvider } from "../../context/AddAdContext";
import { AllAdsProvider } from "@/app/context/AllAdsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <AddAdProvider>
        <AllAdsProvider>
          <div className={styles.layout}>{children}</div>
          <Footer />
        </AllAdsProvider>
      </AddAdProvider>
    </main>
  );
}
