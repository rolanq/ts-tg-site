"use client";
import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { AddAdProvider } from "../../context/AddAdContext";
import { AllAdsProvider } from "@/app/context/AllAdsContext";
import { UsersAdsProvider } from "@/app/context/UsersAdsContext";
import { SearchAdsProvider } from "@/app/context/SearchAdsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <AddAdProvider>
        <SearchAdsProvider>
          <AllAdsProvider>
            <UsersAdsProvider>
              <div className={styles.layout}>{children}</div>
              <Footer />
            </UsersAdsProvider>
          </AllAdsProvider>
        </SearchAdsProvider>
      </AddAdProvider>
    </main>
  );
}
