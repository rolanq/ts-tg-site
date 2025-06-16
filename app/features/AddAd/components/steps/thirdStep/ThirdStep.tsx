import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, { useCallback, useContext, useEffect } from "react";
import styles from "../../commonSteps.module.css";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { AddAdContext } from "../../../../../context/AddAdContext";
import { updateDraft } from "@/app/services/Draft";
import CustomMaskInput from "@/app/shared/kit/CustomMaskInput/CustomMaskInput";
import { checkIsThirdStepValid } from "../../utils";

export const ThirdStep = () => {
  const {
    preparedData,
    setPreparedData,
    setIsNextStepDisabled,
    setOnClickNextStep,
    setOpenedStep,
    openedStep,
  } = useContext(AddAdContext);

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

  useEffect(() => {
    if (openedStep !== 3) {
      return;
    }

    if (checkIsThirdStepValid(preparedData)) {
      setIsNextStepDisabled(false);

      setOnClickNextStep(() => {
        return () => {
          updateDraft(Number(preparedData.userId), {
            ...preparedData,
            autotekaLink: preparedData.autotekaLink?.startsWith(
              "https://autoteka.ru/"
            )
              ? preparedData.autotekaLink
              : null,
          });
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

  const checkAutotekaLink = useCallback((value: string) => {
    return value.startsWith("https://autoteka.ru/");
  }, []);

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
          placeholder="Введите цену"
          label="Цена"
          type="number"
          min={0}
          max={100000000}
        />
        <CustomMaskInput
          className={styles.input}
          value={preparedData.phoneNumber || ""}
          onChange={handlePhoneNumberChange}
          placeholder="Введите номер телефона"
          label="Номер телефона"
          mask="+7 (000) 000-00-00"
          errorMessage="Неправильный номер телефона"
        />
        <CustomInput
          value={preparedData.autotekaLink || ""}
          onChange={handleAutotekaLinkChange}
          placeholder="Введите ссылку на автотеку"
          label="Ссылка на автотеку"
          errorMessage="Ссылка должна начинаться с https://autoteka.ru/"
          type="text"
          checkValue={checkAutotekaLink}
        />
        <CustomInput
          value={preparedData.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Введите описание"
          label="Описание"
        />
      </CustomFlex>
    </CustomFlex>
  );
};
