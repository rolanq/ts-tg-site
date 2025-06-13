import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomSelect } from "@/app/shared/kit/CustomSelect/CustomSelect";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useContext, useMemo } from "react";
import { AddAdContext } from "../../../context/AddAdContext";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import styles from "../../commonSteps.module.css";

export const FirstStep = () => {
  const { regions, models, brands, preparedData, setPreparedData } =
    useContext(AddAdContext);

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
  }, [preparedData]);

  return (
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
          placeholder="Регион"
        />
        <CustomFlex gap="10px" className={styles.stepCommonBody}>
          <CustomSelect
            options={preparedOptions.brands}
            onChange={handleBrandChange}
            placeholder="Марка"
          />
          <CustomSelect
            options={preparedOptions.models}
            onChange={handleModelChange}
            placeholder="Модель"
          />
        </CustomFlex>
        <CustomInput
          value={preparedData.year?.toString() || ""}
          onChange={handleYearChange}
          placeholder="Год"
          type="number"
        />
      </CustomFlex>
    </CustomFlex>
  );
};
