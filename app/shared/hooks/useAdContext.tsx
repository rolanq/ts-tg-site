import { useContext } from "react";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { UsersAdsContext } from "@/app/context/UsersAdsContext";
import { SearchAdsContext } from "@/app/context/SearchAdsContext";
import { usePathname } from "next/navigation";

export const useAdsContext = () => {
  const pathname = usePathname();
  const isProfile = pathname.includes("profile");
  const isSearchAds = pathname.includes("ads");

  if (isProfile) {
    return useContext(UsersAdsContext);
  }

  if (isSearchAds) {
    return useContext(SearchAdsContext);
  }

  return useContext(AllAdsContext);
};
