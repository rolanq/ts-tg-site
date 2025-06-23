import { CustomFlex } from "@/app/shared/kit/CustomFlex/CustomFlex";
import { CustomTyphography } from "@/app/shared/kit/CustomTyphography/CustomTyphography";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomSelect } from "@/app/shared/kit/CustomSelect/CustomSelect";
import { updateSavedSearch } from "@/app/services/SavedSearch";
import { useTelegram } from "@/app/shared/hooks/useTelegram";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { CustomInput } from "@/app/shared/kit/CustomInput/CustomInput";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CustomLoader from "@/app/shared/kit/CustomLoader/CustomLoader";
import FooterButtons from "./FooterButtons";
import { BasicInfoContext } from "@/app/context/BasicInfoContext";
import { PureBottomSheet } from "@/app/shared/kit/PureBottomSheet/PureBottomSheet";
import { NotificationsContext } from "@/app/context/NotificationsContext";
import styles from "./Notification.module.css";
import { updateOrCreateNotification } from "@/app/services/Notifications";

export default function Notification() {
  const { user } = useTelegram();
  const { regions, brands } = useContext(BasicInfoContext);
  const { notification, setNotification, isLoading, setIsLoading, refetch } =
    useContext(NotificationsContext);
  const [isShowContent, setIsShowContent] = useState(false);

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
      setNotification((prev) => ({
        ...prev,
        regionId: Number(value),
      }));
    },
    [user?.id, setNotification]
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      setNotification((prev) => ({
        ...prev,
        brandId: Number(value),
      }));
    },
    [user?.id, setNotification]
  );

  const handleResetRegion = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      regionId: null,
    }));
  }, [setNotification]);
  const handleResetPriceFrom = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      priceFrom: null,
    }));
  }, [setNotification]);
  const handleResetPriceTo = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      priceTo: null,
    }));
  }, [setNotification]);

  const handleResetBrand = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      brandId: null,
    }));
  }, [setNotification]);

  const handlePriceFromChange = useCallback((value: string) => {
    setNotification((prev) => ({
      ...prev,
      priceFrom: Number(value),
    }));
  }, []);

  const handlePriceToChange = useCallback((value: string) => {
    setNotification((prev) => ({
      ...prev,
      priceTo: Number(value),
    }));
  }, []);

  const onDismiss = useCallback(() => {
    setNotification(null);
  }, [setNotification]);

  const handleSave = useCallback(() => {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    updateOrCreateNotification(notification, notification?.id).then(
      (updatedNotification) => {
        setNotification({ userId: String(user.id), ...updatedNotification });
        onDismiss();
        refetch();
      }
    );
  }, [user?.id, notification, onDismiss, refetch, setNotification]);

  useEffect(() => {
    if (!isLoading && !!notification) {
      const timer = setTimeout(() => {
        setIsShowContent(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      setIsShowContent(true);
    }
  }, [isLoading, notification]);

  return (
    <PureBottomSheet
      open={!!notification}
      onDismiss={onDismiss}
      snap={60}
      closeIcon={false}
      footerWithoutBoxShadow
      footer={
        <FooterButtons
          onDismiss={onDismiss}
          handleSave={handleSave}
          isLoading={!isShowContent}
          isUpdating={isLoading}
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
            <div className={styles.content}>
              <CustomTyphography fontSize="20px" fontWeight="bold">
                Изменение параметров поиска
              </CustomTyphography>
              <div className={styles.container}>
                <CustomSelect
                  value={notification?.regionId?.toString() || ""}
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

                <CustomSelect
                  value={notification?.brandId?.toString() || ""}
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

                <CustomInput
                  type="number"
                  label="Цена от"
                  placeholder="Введите цену от"
                  value={notification?.priceFrom?.toString() || ""}
                  onChange={handlePriceFromChange}
                />
                <CustomButton
                  variant="tertiary"
                  padding="small"
                  className={styles.resetButton}
                  onClick={handleResetPriceFrom}
                >
                  Сбросить
                </CustomButton>
                <CustomInput
                  type="number"
                  label="Цена до"
                  placeholder="Введите цену до"
                  value={notification?.priceTo?.toString() || ""}
                  onChange={handlePriceToChange}
                />
                <CustomButton
                  variant="tertiary"
                  padding="small"
                  className={styles.resetButton}
                  onClick={handleResetPriceTo}
                >
                  Сбросить
                </CustomButton>
              </div>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </PureBottomSheet>
  );
}
