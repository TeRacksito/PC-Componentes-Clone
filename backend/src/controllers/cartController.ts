import { RequestHandler } from "express";
import {
  addProductToClient,
  getProductsQuantitiesByClientIdFromDB,
} from "../services/clientService/clientsProducts";
import { wrapSuccessResponse } from "./responseWrapper";

export const getCart: RequestHandler = async (req, res, next) => {
  try {
    let cart = [];
    if (req.client) {
      cart = (await getProductsQuantitiesByClientIdFromDB(req.client.id)).map(
        (clientProductModel) => {
          const { product_id, quantity } = clientProductModel;
          return { product_id, quantity };
        },
      );
    } else {
      cart = req.session.cart || [];
    }

    res.json(wrapSuccessResponse("cart", cart));
  } catch (error) {
    next(error);
  }
};

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      throw new Error("Product id is required");
    }

    let cart = [];
    if (req.client) {
      addProductToClient({ client_id: req.client.id, product_id, quantity: 1 });
      res.status(201).send();
      return;
    } else {
      cart = req.session.cart || [];
    }

    const productIndex = cart.findIndex(
      (product) => product.product_id === product_id,
    );
    if (productIndex !== -1) {
      cart[productIndex].quantity++;
    } else {
      cart.push({ product_id, quantity: 1 });
    }

    req.session.cart = cart;
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};
