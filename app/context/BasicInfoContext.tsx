"use client";
import { createContext, useEffect, useState } from "react";
import { IBrand, ICarModel, IRegion } from "../db/db";
import { loadBrandsAndRegions } from "../services/GetBrands";

export interface BasicInfoContextType {
  regions: IRegion[];
  brands: IBrand[];
}

export const BasicInfoContext = createContext<BasicInfoContextType>({
  regions: [],
  brands: [],
});

export const BasicInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    loadBrandsAndRegions().then(({ serializedBrands, serializedRegions }) => {
      setBrands(serializedBrands);
      setRegions(serializedRegions);
    });
  }, []);

  return (
    <BasicInfoContext.Provider value={{ regions, brands }}>
      {children}
    </BasicInfoContext.Provider>
  );
};
