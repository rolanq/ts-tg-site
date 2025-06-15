import { createContext, useContext, useEffect, useState } from "react";
import { IContextCreateAd } from "./types";
import { STEPS_ENUM } from "@/app/shared/types/config";
import { IBrand, IRegion, ICarModel, IAdvertisementDraft } from "@/app/db/db";
import { getDraft } from "../../../services/Draft";
import { loadBrandsAndRegions, getModels } from "../../../services/GetBrands";
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
  openedStep: 0,
  setOpenedStep: () => {},
  brands: [],
  regions: [],
  models: [],
  setBrands: () => {},
  setRegions: () => {},
  setModels: () => {},
  isNextStepDisabled: false,
  setIsNextStepDisabled: () => {},
  onClickNextStep: () => {},
  setOnClickNextStep: () => {},
  isDraftLoading: true,
  setIsDraftLoading: () => {},

  preparedVideo: null,
  setPreparedVideo: () => {},
  preparedPhotos: [],
  setPreparedPhotos: () => {},
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
  const [preparedVideo, setPreparedVideo] = useState<File | null>(null);

  const [isNextStepDisabled, setIsNextStepDisabled] = useState(false);
  const [onClickNextStep, setOnClickNextStep] = useState<() => void>(() => {});
  const [isDraftLoading, setIsDraftLoading] = useState(true);

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
    setIsDraftLoading(true);
    if (user?.id) {
      getDraft(user.id)
        .then((draft) => {
          setPreparedData(draft);
        })
        .finally(() => {
          const timeout = setTimeout(() => {
            setIsDraftLoading(false);
            clearTimeout(timeout);
          }, 500);
        });
    }
  }, [user?.id]);

  return (
    <AddAdContext.Provider
      value={{
        preparedData,
        setPreparedData,
        openedStep,
        setOpenedStep,

        brands,
        regions,
        models,
        setBrands,
        setRegions,
        setModels,

        isNextStepDisabled,
        setIsNextStepDisabled,
        onClickNextStep,
        setOnClickNextStep,

        isDraftLoading,
        setIsDraftLoading,

        preparedVideo,
        setPreparedVideo,
        preparedPhotos,
        setPreparedPhotos,
      }}
    >
      {children}
    </AddAdContext.Provider>
  );
};
