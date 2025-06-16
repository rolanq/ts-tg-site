import Layout from "@/app/features/Layout/Layout";
import React from "react";
import AdsList from "../features/AdsList/AdsList";
import { AllAdsProvider } from "../context/AllAdsContext";

export default function Ads() {
  return (
    <Layout>
      <AllAdsProvider>
        <AdsList title="Объявления" />
      </AllAdsProvider>
    </Layout>
  );
}
