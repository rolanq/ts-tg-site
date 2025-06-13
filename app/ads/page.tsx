import Layout from "@/app/features/Layout/Layout";
import React from "react";
import { initDatabase } from "../db/db";
import AdsList from "../features/AdsList/AdsList";

export default async function Development() {
  try {
    await initDatabase();

    return (
      <Layout>
        <AdsList />
      </Layout>
    );
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
}
