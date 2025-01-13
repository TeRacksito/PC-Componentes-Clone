import { RequestHandler } from "express";
import {
  addProductToClient,
  getProductsQuantitiesByClientIdFromDB,
  updateProductQuantityForClient,
  removeProductFromClient,
} from "../services/clientService/clientsProducts";
import { wrapSuccessResponse } from "./responseWrapper";
import { CartContent } from "@pcc/shared";
import { getProductModelByIdFromDB } from "../services/productServices/product";

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

    const cartContent = (await Promise.all(
      cart.map(async ({ product_id, quantity }) => ({
        product: (await getProductModelByIdFromDB(product_id))?.get({
          plain: true,
        }),
        quantity: quantity,
      })),
    )) as CartContent[];

    res.json(wrapSuccessResponse("cart", cartContent));
  } catch (error) {
    next(error);
  }
};

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { quantity } = req.body;
    if (!product_id) {
      throw new Error("Product id is required");
    }

    let cart = [];
    if (req.client) {
      await addProductToClient({
        client_id: req.client.id,
        product_id,
        quantity: quantity || 1,
      });
      const clientProducts = await getProductsQuantitiesByClientIdFromDB(
        req.client.id,
      );
      res.status(201).send(
        wrapSuccessResponse(
          "cartLength",
          clientProducts.reduce((acc, { quantity }) => acc + quantity, 0),
        ),
      );
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
    res.status(201).send(
      wrapSuccessResponse(
        "cartLength",
        cart.reduce((acc, { quantity }) => acc + quantity, 0),
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const updateCartItemQuantity: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { product_id } = req.params;
    const { quantity } = req.body;
    if (!product_id) {
      throw new Error("Product id is required");
    }

    if (!quantity) {
      throw new Error("Quantity is required");
    }

    if (req.client) {
      await updateProductQuantityForClient(req.client.id, product_id, quantity);
      const clientProducts = await getProductsQuantitiesByClientIdFromDB(
        req.client.id,
      );
      res.status(200).send(
        wrapSuccessResponse(
          "cartLength",
          clientProducts.reduce((acc, { quantity }) => acc + quantity, 0),
        ),
      );
      return;
    }

    const cart = req.session.cart || [];
    const productIndex = cart.findIndex(
      (product) => product.product_id === product_id,
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart[productIndex].quantity = quantity;
    req.session.cart = cart;
    res.status(200).send(
      wrapSuccessResponse(
        "cartLength",
        cart.reduce((acc, { quantity }) => acc + quantity, 0),
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const removeFromCart: RequestHandler = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    if (!product_id) {
      throw new Error("Product id is required");
    }

    if (req.client) {
      await removeProductFromClient(req.client.id, product_id);
      const clientProducts = await getProductsQuantitiesByClientIdFromDB(
        req.client.id,
      );
      res.status(200).send(
        wrapSuccessResponse(
          "cartLength",
          clientProducts.reduce((acc, { quantity }) => acc + quantity, 0),
        ),
      );
      return;
    }

    const cart = req.session.cart || [];
    const productIndex = cart.findIndex(
      (product) => product.product_id === product_id,
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.splice(productIndex, 1);
    req.session.cart = cart;
    res.status(200).send(
      wrapSuccessResponse(
        "cartLength",
        cart.reduce((acc, { quantity }) => acc + quantity, 0),
      ),
    );
  } catch (error) {
    next(error);
  }
};
