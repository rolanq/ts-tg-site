"use client";
import React from "react";
import Layout from "../features/Layout/Layout";
import UsersAdsList from "../features/UsersAdsList/UsersAdsList";
import UserCard from "../features/UserCard/UserCard";
import { UsersAdsProvider } from "../context/UsersAdsContext";

export default function ProfilePage() {
  return (
    <Layout>
      <UsersAdsProvider>
        <UserCard />
        <UsersAdsList />
      </UsersAdsProvider>
    </Layout>
  );
}
