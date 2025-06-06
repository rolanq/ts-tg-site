import { IAdvertisementDraft, ICarModel } from "@/app/db/db";
import { FormControl, Select } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  models: ICarModel[];
  onChange: Dispatch<SetStateAction<IAdvertisementDraft | null>>;
}

export default function SelectModel({ models, onChange }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = Number(e.target.value);
    onChange((prev) => ({ ...prev, modelId: modelId } as IAdvertisementDraft));
  };

  return (
    <FormControl isRequired>
      <Select
        name="model"
        placeholder={
          models.length === 0 ? "Сначала выберите бренд" : "Выберите модель"
        }
        onChange={handleChange}
        disabled={models.length === 0}
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
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
