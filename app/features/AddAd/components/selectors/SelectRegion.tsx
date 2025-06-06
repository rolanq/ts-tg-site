import { IAdvertisementDraft, IRegion } from "@/app/db/db";
import { FormControl, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  regions: IRegion[];
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectRegion({ regions, onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = Number(e.target.value);
    onChange(
      (prev) => ({ ...prev, regionId: regionId } as IAdvertisementDraft)
    );
  };

  return (
    <FormControl isRequired>
      <Select
        name="region"
        placeholder="Выберите регион"
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
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
