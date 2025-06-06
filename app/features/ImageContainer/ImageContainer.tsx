"use client";
import { Card, Text } from "@chakra-ui/react";
import Image from "next/image";

export const ImageContainer = ({ image }: { image?: string }) => {
  return (
    <Card
      variant={"elevated"}
      borderRadius={"12px"}
      width={"100px"}
      height={"100px"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"0"}
    >
      {image ? (
        <Image
          src={image}
          alt="Image"
          width={100}
          height={100}
          style={{
            borderRadius: "12px",
            objectFit: "cover",
            overflow: "hidden",
            height: "100px",
            width: "100px",
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
