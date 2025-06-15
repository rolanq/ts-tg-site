import { IAdvertisementDraft, IBrand, ICarModel, IRegion } from "@/app/db/db";
import { Dispatch, SetStateAction } from "react";

export interface IContextCreateAd {
  preparedData: IAdvertisementDraft;
  setPreparedData: Dispatch<SetStateAction<IAdvertisementDraft>>;
  openedStep: number;
  setOpenedStep: Dispatch<SetStateAction<number>>;

  brands: IBrand[];
  setBrands: Dispatch<SetStateAction<IBrand[]>>;
  regions: IRegion[];
  setRegions: Dispatch<SetStateAction<IRegion[]>>;
  models: ICarModel[];
  setModels: Dispatch<SetStateAction<ICarModel[]>>;

  isNextStepDisabled: boolean;
  setIsNextStepDisabled: Dispatch<SetStateAction<boolean>>;
  onClickNextStep: () => void;
  setOnClickNextStep: Dispatch<SetStateAction<() => void>>;

  isDraftLoading: boolean;
  setIsDraftLoading: Dispatch<SetStateAction<boolean>>;

  preparedVideo: File | null;
  setPreparedVideo: Dispatch<SetStateAction<File | null>>;
  preparedPhotos: File[];
  setPreparedPhotos: Dispatch<SetStateAction<File[]>>;
}
