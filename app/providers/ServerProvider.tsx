"use server";
import { initDatabase } from "@/app/db/db";

export default async function ServerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  await initDatabase();
  return <>{children}</>;
}
