import { Flex, Text } from "@chakra-ui/react";
import { Advertisement, Brand, CarModel, initDatabase, Region } from "./db/db";
import WebAppInit from "./components/WebAppInit";
import AdCard from "./components/AdCard/AdCard";
import AdsList from "./components/AdsList/AdsList";
import Layout from "./components/Layout/Layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  try {
    await initDatabase();

    return (
      <Layout>
        {/* <WebAppInit /> */}
        <AdsList />
      </Layout>
    );
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
}
