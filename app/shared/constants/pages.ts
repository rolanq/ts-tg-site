import { AdsIcon } from "@/app/features/Icons/AdsIcon";
import { GavelIcon } from "@/app/features/Icons/GavelIcon";
import { HomeIcon } from "@/app/features/Icons/HomeIcon";
import { PlusIcon } from "@/app/features/Icons/PlusIcon";
import { UserIcon } from "@/app/features/Icons/UserIcon";

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
