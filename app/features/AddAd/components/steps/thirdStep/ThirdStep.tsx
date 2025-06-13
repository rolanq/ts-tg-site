import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useContext } from "react";
import styles from "../../commonSteps.module.css";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { AddAdContext } from "../../../context/AddAdContext";

export const ThirdStep = () => {
  const { preparedData, setPreparedData } = useContext(AddAdContext);

  const handleDescriptionChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, description: value }));
  };

  const handlePriceChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, price: Number(value) }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleAutotekaLinkChange = (value: string) => {
    setPreparedData((prev) => ({ ...prev, autotekaLink: value }));
  };

  return (
    <CustomFlex direction="column" gap="10px" className={styles.stepCommon}>
      <CustomTyphography fontSize="18px" fontWeight="bold">
        Общая информация
      </CustomTyphography>

      <CustomFlex
        direction="column"
        gap="10px"
        className={styles.stepCommonBody}
      >
        <CustomInput
          className={styles.input}
          value={preparedData.price?.toString() || ""}
          onChange={handlePriceChange}
          placeholder="Цена"
        />
        <CustomInput
          className={styles.input}
          value={preparedData.phoneNumber || ""}
          onChange={handlePhoneNumberChange}
          placeholder="Номер телефона"
        />
        <CustomInput
          value={preparedData.autotekaLink || ""}
          onChange={handleAutotekaLinkChange}
          placeholder="Ссылка на автотеку"
        />
        <CustomInput
          value={preparedData.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Описание"
        />
      </CustomFlex>
    </CustomFlex>
  );
};
