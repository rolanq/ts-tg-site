import { createContext, useContext, useEffect, useState } from "react";
import { IContextCreateAd } from "./types";
import { STEPS_ENUM } from "@/app/shared/types/config";
import { IBrand, IRegion, ICarModel, IAdvertisementDraft } from "@/app/db/db";
import { getDraft } from "../../../services/Draft";
import { loadBrandsAndRegions, getModels } from "../../../services/GetBrands";
import { telegramContext } from "@/app/providers/TelegramProvider";
import {
  DEFAULT_AD_DRAFT,
  TELEGRAM_API_URL,
  TELEGRAM_FILE_API_URL,
} from "@/app/shared/constants/telegram";

const initialState: IContextCreateAd = {
  preparedData: DEFAULT_AD_DRAFT,
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

  isPublishing: false,
  setIsPublishing: () => {},
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
  const [isPublishing, setIsPublishing] = useState(false);

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
    preparedData.photos.forEach((photo) => {
      fetch(`${TELEGRAM_API_URL}/getFile?file_id=${photo}`)
        .then((res) => res.json())
        .then((fileData) => {
          if (!fileData.ok) {
            console.error("Ошибка получения информации о файле:", fileData);
            return;
          }

          const filePath = fileData.result.file_path;

          setPreparedPhotos((prev) => [
            ...prev,
            new File([], `${TELEGRAM_FILE_API_URL}/${filePath}`),
          ]);
        });
    });

    if (preparedData.video) {
      fetch(`${TELEGRAM_API_URL}/getFile?file_id=${preparedData.video}`)
        .then((res) => res.json())
        .then((fileData) => {
          if (!fileData.ok) {
            console.error("Ошибка получения информации о файле:", fileData);
            return;
          }

          const filePath = fileData.result.file_path;
          setPreparedVideo(
            new File([], `${TELEGRAM_FILE_API_URL}/${filePath}`)
          );
        });
    }
  }, [preparedData.photos, preparedData.video]);

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

        isPublishing,
        setIsPublishing,
      }}
    >
      {children}
    </AddAdContext.Provider>
  );
};
