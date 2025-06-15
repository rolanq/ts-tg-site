import Layout from "@/app/features/Layout/Layout";
import React from "react";
import AdsList from "../features/AdsList/AdsList";
import { AllAdsProvier } from "../context/AllAdsContext";

export default function Ads() {
  return (
    <Layout>
      <AllAdsProvier>
        <AdsList title="Объявления" />
      </AllAdsProvier>
    </Layout>
  );
}
