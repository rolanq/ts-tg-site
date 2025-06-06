"use client";
import { COLORS } from "@/app/constants/colors";
import { Card, Text } from "@chakra-ui/react";
import Image from "next/image";

export const ImageContainer = ({ image }: { image?: string }) => {
  return (
    <Card
      variant={"elevated"}
      borderRadius={"12px"}
      width={"80px"}
      height={"80px"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"0"}
    >
      {image ? (
        <Image
          src={image}
          alt="Image"
          width={80}
          height={80}
          style={{
            borderRadius: "12px",
            objectFit: "cover",
            overflow: "hidden",
            height: "80px",
            width: "80px",
          }}
          unoptimized
          priority
        />
      ) : (
        <Text>Без фото</Text>
      )}
    </Card>
  );
};
