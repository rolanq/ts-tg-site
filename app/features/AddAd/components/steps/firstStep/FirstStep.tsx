import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomSelect } from "@/app/shared/kit/CustomSelect/CustomSelect";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useContext, useEffect, useMemo } from "react";
import { AddAdContext } from "../../../context/AddAdContext";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import styles from "../../commonSteps.module.css";
import { updateDraft } from "@/app/services/Draft";
import { checkIsFirstStepValid } from "../../utils";

export const FirstStep = () => {
  const {
    regions,
    models,
    brands,
    preparedData,
    setPreparedData,
    setIsNextStepDisabled,
    setOnClickNextStep,
    setOpenedStep,
    openedStep,
  } = useContext(AddAdContext);

  const handleRegionChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, regionId: Number(value) }));
  };

  const handleBrandChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, brandId: Number(value) }));
  };

  const handleModelChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, modelId: Number(value) }));
  };

  const handleYearChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, year: Number(value) }));
  };

  const preparedOptions = useMemo(() => {
    return {
      regions: regions.map((region) => ({
        value: region.id?.toString() || "",
        label: region.name,
      })),
      brands: brands.map((brand) => ({
        value: brand.id?.toString() || "",
        label: brand.name,
      })),
      models: models.map((model) => ({
        value: model.id?.toString() || "",
        label: model.name,
      })),
    };
  }, [regions, brands, models]);

  useEffect(() => {
    if (openedStep !== 1) {
      return;
    }

    if (checkIsFirstStepValid(preparedData)) {
      setIsNextStepDisabled(false);

      setOnClickNextStep(() => {
        return () => {
          updateDraft(Number(preparedData.userId), preparedData);
          setOpenedStep((prev) => prev + 1);
        };
      });
    } else {
      setIsNextStepDisabled(true);
      setOnClickNextStep(() => {});
    }
  }, [
    preparedData,
    setIsNextStepDisabled,
    setOnClickNextStep,
    setOpenedStep,
    openedStep,
  ]);

  return (
    <>
      <CustomFlex direction="column" gap="10px" className={styles.stepCommon}>
        <CustomTyphography fontSize="18px" fontWeight="bold">
          Выбор региона, марки и модели
        </CustomTyphography>

        <CustomFlex
          direction="column"
          gap="10px"
          className={styles.stepCommonBody}
        >
          <CustomSelect
            options={preparedOptions.regions}
            onChange={handleRegionChange}
            placeholder="Введите регион продажи"
            label="Регион продажи"
          />
          <CustomFlex gap="10px" className={styles.stepCommonBody}>
            <CustomSelect
              options={preparedOptions.brands}
              onChange={handleBrandChange}
              placeholder="Выберите марку машины"
              label="Марка машины"
              className={styles.flexStepSelector}
            />
            <CustomSelect
              options={preparedOptions.models}
              onChange={handleModelChange}
              placeholder={
                preparedData.brandId
                  ? "Выберите модель машины"
                  : "Сначала выберите марку машины"
              }
              label="Модель машины"
              disabled={!preparedData.brandId}
              className={styles.flexStepSelector}
            />
          </CustomFlex>
          <CustomInput
            value={preparedData.year?.toString() || ""}
            onChange={handleYearChange}
            placeholder="Введите год"
            type="number"
            label={`Год выпуска`}
            min={1900}
            max={new Date().getFullYear()}
          />
        </CustomFlex>
      </CustomFlex>
    </>
  );
};
