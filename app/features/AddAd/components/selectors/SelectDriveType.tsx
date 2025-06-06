import { IAdvertisementDraft } from "@/app/db/db";
import { DRIVE_TYPES } from "@/app/shared/types/config";
import { FormControl, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectDriveType({ onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const driveType = e.target.value;
    onChange(
      (prev) => ({ ...prev, driveType: driveType } as IAdvertisementDraft)
    );
  };

  return (
    <FormControl isRequired>
      <Select
        name="driveType"
        placeholder="Выберите тип привода"
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
        {DRIVE_TYPES.map((driveType) => (
          <option key={driveType} value={driveType}>
            {driveType}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
