import { IAdvertisementDraft } from "@/app/db/db";
import { ENGINE_TYPES } from "@/app/shared/types/config";
import { FormControl, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectEngineType({ onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const engineType = e.target.value;
    onChange(
      (prev) => ({ ...prev, engineType: engineType } as IAdvertisementDraft)
    );
  };

  return (
    <FormControl isRequired>
      <Select
        name="engineType"
        placeholder="Выберите тип двигателя"
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
        {ENGINE_TYPES.map((engineType) => (
          <option key={engineType} value={engineType}>
            {engineType}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
