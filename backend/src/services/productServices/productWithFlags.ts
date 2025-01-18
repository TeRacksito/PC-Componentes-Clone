import { ProductWithFlags } from "@pcc/shared";
import { FlagModel, ProductModel } from "../../models";

export const getProductsWithFlagsByProductsFromDB = async (
  ...products: ProductModel[]
) => {
  const productsWithFlags: ProductWithFlags[] = [];
  for (const product of products) {
    const flags = await FlagModel.findAll({
      include: [
        {
          model: ProductModel,
          attributes: [],
          where: {
            id: product.id,
          },
        },
      ],
    });

    ;

    productsWithFlags.push({
      ...product.get({ plain: true }),
      flags:flags.map((flag) => flag.get({ plain: true })),
    });
  }
  return productsWithFlags;
};
