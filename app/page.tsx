"use client";
import { AllAdsProvider } from "./context/AllAdsContext";
import AdsList from "./features/AdsList/AdsList";
import Layout from "./features/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <AllAdsProvider>
        <AdsList />
      </AllAdsProvider>
    </Layout>
  );
}
