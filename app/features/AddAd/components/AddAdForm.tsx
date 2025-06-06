"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { createAd } from "./SaveAd";
import SelectBrand from "./selectors/SelectBrand";
import { IAdvertisementDraft, IBrand, ICarModel, IRegion } from "@/app/db/db";
import { getBrandsAndRegions, getModels } from "./GetBrands";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SelectRegion from "./selectors/SelectRegion";
import SelectModel from "./selectors/SelectModel";
import SelectEngineType from "./selectors/SelectEngineType";
import SelectTransmissionType from "./selectors/SelectTransmissionType";
import SelectDriveType from "./selectors/SelectDriveType";
import Image from "next/image";

interface IProps {
  preparedData: IAdvertisementDraft | null;
  setPreparedData: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
  preparedPhotos: File[];
  setPreparedPhotos: Dispatch<SetStateAction<File[]>>;
}

export default function AddAdForm({
  preparedData,
  setPreparedData,
  preparedPhotos,
  setPreparedPhotos,
}: IProps) {
  const inputPhotosRef = useRef<HTMLInputElement>(null);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [models, setModels] = useState<ICarModel[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      const { serializedBrands, serializedRegions } =
        await getBrandsAndRegions();
      setBrands(serializedBrands);
      setRegions(serializedRegions);
    };
    loadBrands();
  }, []);

  useEffect(() => {
    if (preparedData?.brandId) {
      getModels(preparedData.brandId).then((models) => {
        setModels(models);
      });
    } else {
      setModels([]);
    }
  }, [preparedData?.brandId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreparedPhotos([...preparedPhotos, file]);
    }
  };

  return (
    <Box as="form" action={createAd} padding={"10px"}>
      <VStack spacing={4} align="stretch">
        <SelectRegion regions={regions} onChange={setPreparedData} />
        <Flex gap={5}>
          <SelectBrand brands={brands} onChange={setPreparedData} />
          <SelectModel models={models} onChange={setPreparedData} />
        </Flex>
        <FormControl isRequired>
          <Input
            name="year"
            type="number"
            placeholder="Введите год выпуска"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
          />
        </FormControl>
        <Flex gap={5}>
          <SelectEngineType onChange={setPreparedData} />
          <SelectDriveType onChange={setPreparedData} />
          <SelectTransmissionType onChange={setPreparedData} />
        </Flex>

        <FormControl isRequired>
          <Input
            name="mileage"
            type="number"
            placeholder="Введите пробег"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
            min={0}
            max={1000000}
          />
        </FormControl>

        <FormControl isRequired>
          <Input
            name="horsepower"
            type="number"
            placeholder="Введите мощность"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
            min={0}
            max={5000}
          />
        </FormControl>

        <FormControl isRequired>
          <Textarea
            name="description"
            placeholder="Опишите ваш товар"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
          />
        </FormControl>

        <FormControl isRequired>
          <Input
            name="autoteka"
            type="text"
            placeholder="Введите ссылку на автотеку"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
          />
        </FormControl>

        <FormControl isRequired>
          <Input
            name="phone"
            type="number"
            placeholder="Введите номер телефона"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
          />
        </FormControl>

        <FormControl isRequired>
          <Flex gap={2}>
            {preparedPhotos.map((photo) => (
              <Image
                key={photo.name}
                src={URL.createObjectURL(photo)}
                alt="photo"
                width={100}
                height={100}
                style={{ borderRadius: "8px" }}
              />
            ))}
          </Flex>
          <Button
            variant="unstyled"
            color="var(--color-dark)"
            fontWeight="bold"
            fontSize="16px"
            padding="12px 16px"
            boxShadow="0px 0.5px 0px 0px rgba(0, 0, 0, 0.2)"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              inputPhotosRef.current?.click();
            }}
          >
            Добавить фото
          </Button>
          <Input
            ref={inputPhotosRef}
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            variant="unstyled"
            display="none"
          />
        </FormControl>

        <FormControl isRequired>
          <Input
            name="price"
            type="number"
            placeholder="Введите цену"
            border="1px solid var(--color-dark)"
            borderRadius="8px"
            _active={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _focus={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            _hover={{
              border: "1px solid var(--color-dark)",
              outline: "none",
            }}
            focusBorderColor="2px solid var(--color-dark)"
          />
        </FormControl>
      </VStack>
    </Box>
  );
}
