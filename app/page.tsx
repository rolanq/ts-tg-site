"use client";
import AdsList from "./features/AdsList/AdsList";
import Layout from "./features/Layout/Layout";
import { AllAdsProvier } from "./context/AllAdsContext";

export default function Home() {
  return (
    <Layout>
      <AllAdsProvier>
        <AdsList title="Все объявления" />
      </AllAdsProvier>
    </Layout>
  );
}
