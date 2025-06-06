"use client";
import { CustomBottomSheet } from "@/app/shared/kit/CustomBottomSheet/CustomBottomSheet";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./AddAd.module.css";
import { PlusIcon } from "../Icons/PlusIcon";

export const AddAd = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
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
          onClick={handleClick}
        >
          <PlusIcon />
        </IconButton>
      </Box>
      <CustomBottomSheet
        snap={80}
        open={open}
        onDismiss={handleClick}
        footerWithoutBoxShadow
      >
        <Text>Add Ad</Text>
      </CustomBottomSheet>
    </>
  );
};
