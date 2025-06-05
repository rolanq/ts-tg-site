import { Flex, Text } from "@chakra-ui/react";
import { Advertisement, initDatabase } from "./db/db";
import AdCard from "./components/AdCard";
// import WebAppInit from "./components/WebAppInit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  try {
    await initDatabase();
    console.log("База данных инициализирована");

    const advertisements = await Advertisement.findAll();
    console.log("Найдено объявлений:", advertisements.length);

    const serializedAds = advertisements.map((ad) => {
      const json = ad.toJSON();
      return {
        ...json,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt,
      };
    });

    return (
      <>
        {/* <WebAppInit /> */}
        <Flex flexDirection="column" gap={5} padding={10}>
          {serializedAds.length === 0 ? (
            <Text>Объявлений пока нет</Text>
          ) : (
            serializedAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
          )}
        </Flex>
      </>
    );
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error; // Пробрасываем ошибку в error.tsx
  }
}
