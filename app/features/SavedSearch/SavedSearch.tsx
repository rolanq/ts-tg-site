import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./SavedSearch.module.css";
import { CustomSelect } from "@/app/shared/kit/CustomSelect/CustomSelect";
import { IBrand, IRegion, ISavedSearch } from "@/app/db/db";
import { loadBrandsAndRegions } from "@/app/services/GetBrands";
import { getSavedSearch, updateSavedSearch } from "@/app/services/SavedSearch";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { AllAdsContext } from "@/app/context/AllAdsContext";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import { AddAdContext } from "@/app/context/AddAdContext";
import FooterButtons from "./FooterButtons";

interface SavedSearchProps {
  open: boolean;
  onDismiss: () => void;
}

export default function SavedSearch({ open, onDismiss }: SavedSearchProps) {
  const { user } = useTelegram();
  const { refetch, savedSearch, setSavedSearch } = useContext(AllAdsContext);
  const { regions, brands } = useContext(AddAdContext);

  const [isShowContent, setIsShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
    };
  }, [regions, brands]);

  const handleRegionChange = useCallback(
    (value: string) => {
      console.log(value);

      setSavedSearch((prev) => ({
        ...prev,
        regionId: Number(value),
      }));
    },
    [user?.id, setSavedSearch]
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      setSavedSearch((prev) => ({
        ...prev,
        brandId: Number(value),
      }));
    },
    [user?.id, setSavedSearch]
  );

  const handleResetRegion = useCallback(() => {
    setSavedSearch((prev) => ({
      ...prev,
      regionId: null,
    }));
  }, [setSavedSearch]);

  const handleResetBrand = useCallback(() => {
    setSavedSearch((prev) => ({
      ...prev,
      brandId: null,
    }));
  }, [setSavedSearch]);

  const handlePriceFromChange = useCallback((value: string) => {
    setSavedSearch((prev) => ({
      ...prev,
      priceFrom: Number(value),
    }));
  }, []);

  const handlePriceToChange = useCallback((value: string) => {
    setSavedSearch((prev) => ({
      ...prev,
      priceTo: Number(value),
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (!user?.id) {
      return;
    }

    setIsUpdating(true);
    updateSavedSearch(user.id, {
      ...savedSearch,
      userId: String(user.id),
    }).then((updatedSavedSearch) => {
      setSavedSearch(updatedSavedSearch);
      onDismiss();
      refetch();
      setIsUpdating(false);
    });
  }, [user?.id, savedSearch, onDismiss, refetch, setSavedSearch]);

  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      getSavedSearch(user?.id).then((savedSearch) => {
        setSavedSearch(savedSearch);
        setIsLoading(false);
      });
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoading && open) {
      const timer = setTimeout(() => {
        setIsShowContent(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      setIsShowContent(true);
    }
  }, [isLoading, open]);

  return (
    <CustomBottomSheet
      open={open}
      onDismiss={onDismiss}
      snap={60}
      closeIcon={false}
      footerWithoutBoxShadow
      footer={
        <FooterButtons
          onDismiss={onDismiss}
          handleSave={handleSave}
          isLoading={!isShowContent}
          isUpdating={isUpdating}
        />
      }
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={!isShowContent ? "loading" : "content"}
          timeout={300}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          unmountOnExit
        >
          {!isShowContent ? (
            <div className={styles.loaderContainer}>
              <CustomLoader
                size={36}
                loading={isLoading}
                label="Загружаем данные"
                successLabel="Данные загружены"
              />
            </div>
          ) : (
            <>
              {isUpdating ? (
                <div className={styles.loaderContainer}>
                  <CustomLoader
                    size={36}
                    loading={isUpdating}
                    label="Обновляем данные"
                    successLabel="Данные обновлены"
                  />
                </div>
              ) : (
                <>
                  <CustomFlex
                    direction="column"
                    gap="10px"
                    className={styles.container}
                  >
                    <CustomTyphography fontSize="20px" fontWeight="bold">
                      Изменение параметров поиска
                    </CustomTyphography>

                    <CustomFlex gap="5px" align="center">
                      <CustomSelect
                        value={savedSearch?.regionId?.toString() || ""}
                        options={preparedOptions.regions}
                        onChange={handleRegionChange}
                        placeholder="Введите регион продажи"
                        label="Регион продажи"
                        className={styles.select}
                      />
                      <CustomButton
                        variant="tertiary"
                        padding="small"
                        className={styles.resetButton}
                        onClick={handleResetRegion}
                      >
                        Сбросить
                      </CustomButton>
                    </CustomFlex>

                    <CustomFlex gap="5px" align="center">
                      <CustomSelect
                        value={savedSearch?.brandId?.toString() || ""}
                        options={preparedOptions.brands}
                        onChange={handleBrandChange}
                        placeholder="Выберите марку машины"
                        label="Марка машины"
                        className={styles.select}
                      />
                      <CustomButton
                        variant="tertiary"
                        padding="small"
                        className={styles.resetButton}
                        onClick={handleResetBrand}
                      >
                        Сбросить
                      </CustomButton>
                    </CustomFlex>

                    <CustomInput
                      type="number"
                      label="Цена от"
                      placeholder="Введите цену от"
                      value={savedSearch?.priceFrom?.toString() || ""}
                      onChange={handlePriceFromChange}
                    />
                    <CustomInput
                      type="number"
                      label="Цена до"
                      placeholder="Введите цену до"
                      value={savedSearch?.priceTo?.toString() || ""}
                      onChange={handlePriceToChange}
                    />
                  </CustomFlex>
                </>
              )}
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
    </CustomBottomSheet>
  );
}
