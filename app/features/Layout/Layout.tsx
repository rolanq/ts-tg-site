"use client";
import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";
import { BasicInfoProvider } from "@/app/context/BasicInfoContext";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.main}>
      <BasicInfoProvider>
        <div className={styles.layout}>{children}</div>
        <Footer />
      </BasicInfoProvider>
      <Toaster />
    </main>
  );
}
