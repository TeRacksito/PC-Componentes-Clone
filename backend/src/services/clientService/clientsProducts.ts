import { ClientProduct } from "@pcc/shared";
import { ClientModel, ClientProductModel, ProductModel } from "../../models";

export const getProductsByClientIdFromDB = async (id: string) => {
  return ProductModel.findAll({
    include: [
      {
        model: ClientModel,
        where: { id },
      },
    ],
  });
};

export const getProductsQuantitiesByClientIdFromDB = async (id: string) => {
  return ClientProductModel.findAll({
    where: { client_id: id },
  });
};

export const addProductToClient = async (
  ...clientProducts: ClientProduct[]
) => {
  for (const clientProduct of clientProducts) {
    const [product, created] = await ClientProductModel.findOrCreate({
      where: {
        client_id: clientProduct.client_id,
        product_id: clientProduct.product_id,
      },
      defaults: { quantity: clientProduct.quantity },
    });

    if (!created) {
      await product.increment("quantity", { by: clientProduct.quantity });
    }
  }
};
