import { Product, ProductWithFlags } from "@pcc/shared";
import { FlagModel } from "../../models/flagsModel";
import { ProductModel } from "../../models";

export const getProductsWithFlagsByProductsFromDB = async (
  ...products: ProductModel[]
) => {
  const productsWithFlags: ProductWithFlags[] = [];
  for (const product of products) {
    const flags = await FlagModel.findAll({
      include: [
        {
          model: ProductModel,
          where: {
            id: product.id,
          },
        },
      ],
    });
    productsWithFlags.push({
      ...product.get(),
      flags,
    });
  }
  return productsWithFlags;
};
