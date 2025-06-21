import { NextResponse } from "next/server";
import { TELEGRAM_API_URL } from "@/app/shared/constants/telegram";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Обработка команды /start
    if (body.message?.text === "/start") {
      const chatId = body.message.chat.id;

      const message =
        "Добро пожаловать! Для просмотра объявлений перейдите в наше веб-приложение.";

      // Создаем объект с данными для отправки
      const data = {
        chat_id: chatId.toString(),
        text: message,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚗 Открыть приложение",
                web_app: { url: "https://vkasanie.com" },
              },
            ],
          ],
        },
      };

      // Отправляем сообщение с кнопкой
      await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Для подтверждения webhook URL при настройке
export async function GET() {
  return NextResponse.json({ ok: true });
}
