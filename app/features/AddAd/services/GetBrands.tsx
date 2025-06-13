"use server";
import {
  Brand,
  CarModel,
  IBrand,
  ICarModel,
  IRegion,
  Region,
} from "@/app/db/db";

async function getBrandsAndRegions() {
  const brands = await Brand.findAll();
  const regions = await Region.findAll();
  const serializedBrands: IBrand[] = brands.map((brand) => {
    const json = brand.toJSON();
    return {
      ...json,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  });
  const serializedRegions: IRegion[] = regions.map((region) => {
    const json = region.toJSON();
    return {
      ...json,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  });
  return { serializedBrands, serializedRegions };
}

export async function getModels(brandId: number) {
  const models = await CarModel.findAll({ where: { brandId } });
  const serializedModels: ICarModel[] = models.map((model) => {
    const json = model.toJSON();
    return {
      ...json,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  });
  return serializedModels;
}

export const loadBrandsAndRegions = async () => {
  const { serializedBrands, serializedRegions } = await getBrandsAndRegions();
  return { serializedBrands, serializedRegions };
};
