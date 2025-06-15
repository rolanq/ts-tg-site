import React, { useContext, useEffect, useMemo } from "react";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import styles from "../../commonSteps.module.css";
import { CustomSelect } from "@/app/shared/kit/CustomSelect/CustomSelect";
import { AddAdContext } from "../../../context/AddAdContext";
import {
  DRIVE_TYPES,
  ENGINE_TYPES,
  TRANSMISSION_TYPES,
} from "@/app/shared/types/config";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { updateDraft } from "@/app/services/Draft";
import { checkIsSecondStepValid } from "../../utils";

export const SecondStep = () => {
  const {
    preparedData,
    setPreparedData,
    setIsNextStepDisabled,
    setOnClickNextStep,
    setOpenedStep,
    openedStep,
  } = useContext(AddAdContext);

  const handleEngineChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, engineType: value }));
  };
  const handleDrivetypeChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, driveType: value }));
  };
  const handleTransmissiontypeChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, transmission: value }));
  };
  const handleHorsePowerChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, horsePower: Number(value) }));
  };
  const handleMileageChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, mileage: Number(value) }));
  };

  const preparedOptions = useMemo(() => {
    return {
      engines: ENGINE_TYPES.map((engine) => ({
        value: engine,
        label: engine,
      })),
      drivetypes: DRIVE_TYPES.map((drivetype) => ({
        value: drivetype,
        label: drivetype,
      })),
      transmissiontypes: TRANSMISSION_TYPES.map((transmissiontype) => ({
        value: transmissiontype,
        label: transmissiontype,
      })),
    };
  }, [preparedData]);

  useEffect(() => {
    if (openedStep !== 2) {
      return;
    }

    if (checkIsSecondStepValid(preparedData)) {
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
    <CustomFlex direction="column" gap="10px" className={styles.stepCommon}>
      <CustomTyphography fontSize="18px" fontWeight="bold">
        Двигатель
      </CustomTyphography>

      <CustomFlex
        gap="10px"
        direction="column"
        className={styles.stepCommonBody}
      >
        <CustomSelect
          options={preparedOptions.engines}
          onChange={handleEngineChange}
          placeholder="Выберите тип двигателя"
          label="Тип двигателя"
        />
        <CustomFlex gap="10px" className={styles.stepCommonBody}>
          <CustomSelect
            options={preparedOptions.drivetypes}
            onChange={handleDrivetypeChange}
            placeholder="Выберите привод"
            label="Привод"
            className={styles.flexStepSelector}
          />
          <CustomSelect
            options={preparedOptions.transmissiontypes}
            onChange={handleTransmissiontypeChange}
            placeholder="Выберите коробку передач"
            label="Коробка передач"
            className={styles.flexStepSelector}
          />
        </CustomFlex>
        <CustomInput
          value={preparedData.horsePower?.toString() || ""}
          onChange={handleHorsePowerChange}
          placeholder="Введите мощность двигателя"
          label="Мощность двигателя"
          type="number"
          min={0}
          max={5000}
        />
        <CustomInput
          value={preparedData.mileage?.toString() || ""}
          onChange={handleMileageChange}
          placeholder="Введите пробег"
          label="Пробег"
          type="number"
          min={0}
          max={1000000}
        />
      </CustomFlex>
    </CustomFlex>
  );
};
