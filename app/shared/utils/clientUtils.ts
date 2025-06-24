"use client";

import { IAdvertisement } from "@/app/db/db";

export const pluralize = (count: number, cases: [string, string, string]) => {
  if (count === 0) return cases[2];
  if (count > 0 && count < 5) return cases[1];
  if (count > 4) return cases[2];
  return cases[0];
};

export const renderAdvertismentMessage = (ad: IAdvertisement) => {
  const adMessage = `
🚗 ${ad.Brand?.name || "Марка не выбрана"} ${
    ad.CarModel?.name || "Модель не выбрана"
  } ${ad.year} г. ${
    ad.isOnHold ? "[ПОД ЗАДАТКОМ]" : ad.isActive ? "" : "[ПРОДАНО]"
  }
  
📍 ${ad.Region?.name || "Регион не выбран"}
🛠 ${ad.engineType}, ${ad.horsePower} л.с.
⚙️ Привод: ${ad.driveType}
🔄 КПП: ${ad.transmission}
📏 Пробег: ${ad.mileage} км
${ad.autotekaLink ? `🔗 <a href="${ad.autotekaLink}">Автотека</a>\n` : ""}
💬 Описание: ${ad.description}
  
💰 Цена: ${ad.price} руб.
  
📱 Контакты:
Телефон: ${ad.phoneNumber}
Telegram: ${ad.telegramUsername ? `@${ad.telegramUsername}` : "Не указано"}

${
  ad.photos.length > 0 || ad.video
    ? `
<a href="https://t.me/Prodaisam_bot?startapp">Посмотреть объявление</a>
`
    : ""
}
`;

  return adMessage;
};
