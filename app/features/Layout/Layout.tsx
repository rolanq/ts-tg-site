import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className={styles.layout}>{children}</div>
      <Footer />
    </main>
  );
}
