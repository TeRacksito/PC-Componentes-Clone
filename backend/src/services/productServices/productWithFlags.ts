import { extractProperties, Product, ProductWithFlags } from "@pcc/shared";
import { FlagModel } from "../../models/flagsModel";
import { ProductModel } from "../../models";

export const getProductsWithFlagsByProductsFromDB = async (
  ...products: Product[]
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
      ...extractProperties<Product>(product),
      flags,
    });
  }
  return productsWithFlags;
};
