"use client";
import Layout from "@/app/features/Layout/Layout";
import React from "react";
import { BasicInfoProvider } from "../context/BasicInfoContext";
import { SearchAdsProvider } from "../context/SearchAdsContext";
import AdsPageSelector from "../features/AdsPageSelector/AdsPageSelector";
import { NotificationsProvider } from "../context/NotificationsContext";

export default function Ads() {
  return (
    <Layout>
      <BasicInfoProvider>
        <SearchAdsProvider>
          <NotificationsProvider>
            <AdsPageSelector />
          </NotificationsProvider>
        </SearchAdsProvider>
      </BasicInfoProvider>
    </Layout>
  );
}
