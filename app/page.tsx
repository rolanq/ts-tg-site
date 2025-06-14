import AdsList from "./features/AdsList/AdsList";
import Layout from "./features/Layout/Layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  try {
    return (
      <Layout>
        <AdsList title="Все объявления" />
      </Layout>
    );
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
}
