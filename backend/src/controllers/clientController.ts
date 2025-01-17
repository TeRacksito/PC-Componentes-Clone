import { compare } from "bcryptjs";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { ClientSignature } from "../@types/clientSignature.types";
import { HttpError } from "../middlewares/HttpError";
import {
  getClientByIdentifierFromDB,
  getClientByIdFromDB,
  signUpClientToDB,
} from "../services/clientService/client";
import { getClientPasswordByIdFromDB } from "../services/clientService/clientPass";
import { addProductToClient } from "../services/clientService/clientsProducts";
import { Error } from "sequelize";

export const authClientByCredentials: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { identifier, password } = req.body;

    const client = await getClientByIdentifierFromDB(identifier);

    if (!client) {
      throw new HttpError("Invalid credentials", 401);
    }

    const passwordHash = await getClientPasswordByIdFromDB(client.id);

    if (!passwordHash) {
      throw new HttpError("Disabled account", 401);
    }

    const isPasswordValid = await compare(password, passwordHash.password_hash);

    if (!isPasswordValid) {
      throw new HttpError("Invalid credentials", 401);
    }

    const token = sign(
      {
        id: client.id,
        email: client.email,
        username: client.username,
      } as ClientSignature,
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    if (req.session.cart) {
      await addProductToClient(
        ...req.session.cart.map((product) => ({
          ...product,
          client_id: client.id,
        })),
      );
    }

    res.status(200).json({
      client: client.get({ plain: true }),
    });
  } catch (error) {
    next(error);
  }
};

export const authClientById: RequestHandler = async (req, res, next) => {
  try {
    const clientSignature = req?.client;

    if (!clientSignature) {
      throw new HttpError("Not authenticated", 401);
    }

    const client = await getClientByIdFromDB(clientSignature.id);

    if (!client) {
      throw new HttpError("Not authenticated", 401);
    }

    res.status(200).json({
      client: client.get({ plain: true }),
    });
  } catch (error) {
    next(error);
  }
};

export const signInClient: RequestHandler = async (req, res, next) => {
  try {
    const { name, surname, email, username, password } = req.body;

    await signUpClientToDB(name, surname, email, username, password);

    res.status(200).send();
  } catch (error) {
    if ((error as Error).name === "SequelizeUniqueConstraintError") {
      console.error(error);

      next(new HttpError("Email or username already in use", 400));
      return;
    }

    next(error);
  }
};

export const logoutClient: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("token");

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).send();
    });

  } catch (error) {
    next(error);
  }
};
