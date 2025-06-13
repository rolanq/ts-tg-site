import { IAdvertisementDraft, IBrand, ICarModel, IRegion } from "@/app/db/db";
import { Dispatch, SetStateAction } from "react";

export interface IContextCreateAd {
  preparedData: IAdvertisementDraft;
  setPreparedData: Dispatch<SetStateAction<IAdvertisementDraft>>;
  preparedPhotos: File[];
  setPreparedPhotos: Dispatch<SetStateAction<File[]>>;
  openedStep: number;
  setOpenedStep: Dispatch<SetStateAction<number>>;

  brands: IBrand[];
  setBrands: Dispatch<SetStateAction<IBrand[]>>;
  regions: IRegion[];
  setRegions: Dispatch<SetStateAction<IRegion[]>>;
  models: ICarModel[];
  setModels: Dispatch<SetStateAction<ICarModel[]>>;
}
