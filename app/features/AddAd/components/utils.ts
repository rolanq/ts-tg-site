import { IAdvertisementDraft } from "@/app/db/db";

export const checkIsFirstStepValid = (preparedData: IAdvertisementDraft) => {
  return (
    preparedData.regionId &&
    preparedData.brandId &&
    preparedData.modelId &&
    preparedData.year &&
    Number(preparedData.year) >= 1900 &&
    Number(preparedData.year) <= new Date().getFullYear()
  );
};

export const checkIsSecondStepValid = (preparedData: IAdvertisementDraft) => {
  return (
    preparedData.engineType &&
    preparedData.driveType &&
    preparedData.transmission &&
    preparedData.horsePower &&
    preparedData.mileage &&
    preparedData.horsePower > 0 &&
    preparedData.mileage > 0 &&
    preparedData.horsePower <= 5000 &&
    preparedData.mileage <= 1000000
  );
};

export const checkIsThirdStepValid = (preparedData: IAdvertisementDraft) => {
  return (
    preparedData.price && preparedData.phoneNumber && preparedData.description
  );
};

export const isAvailableToPublish = (preparedData: IAdvertisementDraft) => {
  return (
    checkIsFirstStepValid(preparedData) &&
    checkIsSecondStepValid(preparedData) &&
    checkIsThirdStepValid(preparedData)
  );
};
