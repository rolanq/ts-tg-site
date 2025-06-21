"use client";
import Layout from "@/app/features/Layout/Layout";
import React from "react";
import SearchAdsList from "../features/SearchAdsList/SearchAdsList";
import { BasicInfoProvider } from "../context/BasicInfoContext";
import { SearchAdsProvider } from "../context/SearchAdsContext";

export default function Ads() {
  return (
    <Layout>
      <BasicInfoProvider>
        <SearchAdsProvider>
          <SearchAdsList />
        </SearchAdsProvider>
      </BasicInfoProvider>
    </Layout>
  );
}
