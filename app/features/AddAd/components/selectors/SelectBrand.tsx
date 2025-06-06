"use client";

import { IAdvertisementDraft, IBrand } from "@/app/db/db";
import { FormControl, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  brands: IBrand[];
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectBrand({ brands, onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brandId = Number(e.target.value);
    onChange((prev) => ({ ...prev, brandId: brandId } as IAdvertisementDraft));
  };

  return (
    <FormControl isRequired>
      <Select
        name="brand"
        placeholder="Выберите бренд"
        onChange={handleChange}
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
      >
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
