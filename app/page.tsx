import { Flex, Text } from "@chakra-ui/react";
import { Advertisement, Brand, initDatabase } from "./db/db";
import AdCard from "./components/AdCard";

export default async function Home() {
  await initDatabase();
  const advertisements = (
    await Advertisement.findAll({
      include: [Brand],
    })
  ).map((ad) => ad.toJSON());

  return (
    <Flex flexDirection="column" gap={5} padding={10}>
      {advertisements.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </Flex>
  );
}
