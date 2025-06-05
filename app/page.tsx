import { Advertisement, initDatabase } from "./db/db";

export default async function Home() {
  await initDatabase();
  const advertisements = await Advertisement.findAll();

  return <div></div>;
}
