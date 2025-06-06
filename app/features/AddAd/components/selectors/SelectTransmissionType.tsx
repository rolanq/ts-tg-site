import { IAdvertisementDraft } from "@/app/db/db";
import { TRANSMISSION_TYPES } from "@/app/shared/types/config";
import { FormControl, Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectDriveType({ onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const transmissionType = e.target.value;
    onChange(
      (prev) =>
        ({ ...prev, transmissionType: transmissionType } as IAdvertisementDraft)
    );
  };

  return (
    <FormControl isRequired>
      <Select
        name="transmissionType"
        placeholder="Выберите тип трансмиссии"
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
        {TRANSMISSION_TYPES.map((transmissionType) => (
          <option key={transmissionType} value={transmissionType}>
            {transmissionType}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
