"use server";
export async function createAd(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;

  // TODO: Добавить валидацию и сохранение в базу данных

  //   revalidatePath("/ads");
  //   redirect("/ads");
}
