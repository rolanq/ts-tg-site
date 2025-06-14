import Layout from "@/app/features/Layout/Layout";
import React from "react";
import AdsList from "../features/AdsList/AdsList";

export default function Ads() {
  return (
    <Layout>
      <AdsList title="Объявления" />
    </Layout>
  );
}
