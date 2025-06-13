import React, { useContext, useMemo } from "react";
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

export const SecondStep = () => {
  const { preparedData, setPreparedData } = useContext(AddAdContext);

  const handleEngineChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, engine: value }));
  };
  const handleDrivetypeChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, drivetype: value }));
  };
  const handleTransmissiontypeChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, transmissiontype: value }));
  };
  const handleHorsePowerChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, horsepower: Number(value) }));
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
          placeholder="Тип двигателя"
        />
        <CustomFlex gap="10px" className={styles.stepCommonBody}>
          <CustomSelect
            options={preparedOptions.drivetypes}
            onChange={handleDrivetypeChange}
            placeholder="Привод"
          />
          <CustomSelect
            options={preparedOptions.transmissiontypes}
            onChange={handleTransmissiontypeChange}
            placeholder="Коробка передач"
          />
        </CustomFlex>
        <CustomInput
          value={preparedData.horsePower?.toString() || ""}
          onChange={handleHorsePowerChange}
          placeholder="Мощность двигателя"
          type="number"
        />
        <CustomInput
          value={preparedData.mileage?.toString() || ""}
          onChange={handleMileageChange}
          placeholder="Пробег"
          type="number"
        />
      </CustomFlex>
    </CustomFlex>
  );
};
