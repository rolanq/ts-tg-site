"use client";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./AddAd.module.css";
import { PlusIcon } from "../Icons/PlusIcon";
import AddAdForm from "./components/AddAdForm";
import { IAdvertisementDraft } from "@/app/db/db";

export const AddAd = () => {
  const [open, setOpen] = useState(false);
  const [preparedData, setPreparedData] = useState<IAdvertisementDraft | null>(
    null
  );
  const [preparedPhotos, setPreparedPhotos] = useState<File[]>([]);

  const onDismiss = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        className={styles.footerItem}
        style={{ textDecoration: "none" }}
        alignItems="start"
        height={"100%"}
      >
        <IconButton
          aria-label="Add Ad"
          variant="plain"
          size="md"
          borderRadius={"12px"}
          padding={"8px"}
          boxShadow={"0px 0.5px 0px 0px rgba(0, 0, 0, 0.2)"}
          onClick={onDismiss}
        >
          <PlusIcon />
        </IconButton>
      </Box>
      <CustomBottomSheet
        snap={95}
        open={open}
        onDismiss={onDismiss}
        footerWithoutBoxShadow
        disableDragClose
        footer={
          <Button
            type="submit"
            variant="unstyled"
            className={styles.footerButton}
            color="var(--color-dark)"
            fontWeight="bold"
            fontSize="16px"
            padding="12px 16px"
            borderRadius="12px"
            boxShadow="0px 0.5px 0px 0px rgba(0, 0, 0, 0.2)"
            backgroundColor="var(--color-background)"
            justifyContent="center"
            alignItems="center"
            display="flex"
            height="100%"
            width="100%"
          >
            Создать объявление
          </Button>
        }
      >
        <AddAdForm
          preparedData={preparedData}
          setPreparedData={setPreparedData}
          preparedPhotos={preparedPhotos}
          setPreparedPhotos={setPreparedPhotos}
        />
      </CustomBottomSheet>
    </>
  );
};
