"use client";
import Layout from "@/app/features/Layout/Layout";
import React from "react";
import { CustomFlex } from "../shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "../shared/kit/CustomTyphography/CustomTyphography";

export default function Auction() {
  return (
    <Layout>
      <CustomFlex justify="center" align="center" height="100%">
        <CustomTyphography fontSize="20px" fontWeight="bold">
          В разработке...
        </CustomTyphography>
      </CustomFlex>
    </Layout>
  );
}
