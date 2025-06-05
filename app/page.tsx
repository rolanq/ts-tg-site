import { Flex } from "@chakra-ui/react";
import { Advertisement, Brand, initDatabase } from "./db/db";
import AdCard from "./components/AdCard";
import WebAppInit from "./components/WebAppInit";

export default async function Home() {
  try {
    await initDatabase();

    const advertisements = await Advertisement.findAll({});

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
        <WebAppInit />
        <Flex flexDirection="column" gap={5} padding={10}>
          {serializedAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </Flex>
      </>
    );
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return (
      <Flex flexDirection="column" gap={5} padding={10}>
        <p>Произошла ошибка при загрузке данныхБЛЯЯЯЯЯЯЯТЬ</p>
      </Flex>
    );
  }
}
