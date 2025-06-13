import { createContext, useContext, useEffect, useState } from "react";
import { IContextCreateAd } from "./types";
import { STEPS_ENUM } from "@/app/shared/types/config";
import { IBrand, IRegion, ICarModel, IAdvertisementDraft } from "@/app/db/db";
import { getDraft } from "../services/Draft";
import { loadBrandsAndRegions, getModels } from "../services/GetBrands";
import { telegramContext } from "@/app/providers/TelegramProvider";

const initialState: IContextCreateAd = {
  preparedData: {
    regionId: null,
    brandId: null,
    modelId: null,
    engineType: null,
    horsePower: null,
    driveType: null,
    transmission: null,
    year: null,
    price: null,
    mileage: null,
    description: null,
    phoneNumber: null,
    photos: [],
    currentStep: STEPS_ENUM.REGION,
    autotekaLink: null,
    video: null,
    userId: "0",
  },
  setPreparedData: () => {},
  preparedPhotos: [],
  setPreparedPhotos: () => {},
  openedStep: 0,
  setOpenedStep: () => {},
  brands: [],
  regions: [],
  models: [],
  setBrands: () => {},
  setRegions: () => {},
  setModels: () => {},
};

export const AddAdContext = createContext<IContextCreateAd>(initialState);

export const AddAdProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(telegramContext);
  const [openedStep, setOpenedStep] = useState(0);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [models, setModels] = useState<ICarModel[]>([]);

  const [preparedData, setPreparedData] = useState<IAdvertisementDraft>(
    initialState.preparedData
  );
  const [preparedPhotos, setPreparedPhotos] = useState<File[]>([]);

  useEffect(() => {
    loadBrandsAndRegions().then(({ serializedBrands, serializedRegions }) => {
      setBrands(serializedBrands);
      setRegions(serializedRegions);
    });
  }, []);

  useEffect(() => {
    if (preparedData?.brandId) {
      getModels(preparedData.brandId).then((models) => {
        setModels(models);
      });
    } else {
      setModels([]);
    }
  }, [preparedData?.brandId]);

  useEffect(() => {
    if (user?.id) {
      getDraft(user.id).then((draft) => {
        setPreparedData(draft);
      });
    }
  }, [user?.id]);

  return (
    <AddAdContext.Provider
      value={{
        preparedData,
        setPreparedData,
        preparedPhotos,
        setPreparedPhotos,
        openedStep,
        setOpenedStep,
        brands,
        regions,
        models,
        setBrands,
        setRegions,
        setModels,
      }}
    >
      {children}
    </AddAdContext.Provider>
  );
};
