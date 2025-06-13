import { AdsIcon } from "@/app/shared/Icons/AdsIcon";
import { GavelIcon } from "@/app/shared/Icons/GavelIcon";
import { HomeIcon } from "@/app/shared/Icons/HomeIcon";
import { PlusIcon } from "@/app/shared/Icons/PlusIcon";
import { UserIcon } from "@/app/shared/Icons/UserIcon";

export const PAGES = [
  {
    name: "Главная",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Объявления",
    path: "/ads",
    icon: AdsIcon,
  },
  {
    name: "Разместить объявление",
    path: "/add_ad",
    icon: PlusIcon,
  },
  {
    name: "Аукцион",
    path: "/auction",
    icon: GavelIcon,
  },
  {
    name: "Мой профиль",
    path: "/profile",
    icon: UserIcon,
  },
];
