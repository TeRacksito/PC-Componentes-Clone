import { compare } from "bcryptjs";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { HttpError } from "../middlewares/HttpError";
import {
  getClientByIdentifierFromDB,
  getClientByIdFromDB,
} from "../services/clientService/client";
import { getClientPasswordByIdFromDB } from "../services/clientService/clientPass";
import { ClientSignature } from "../@types/clientSignature.types";

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
      httpOnly: false,
      secure: false,
    });

    console.log(client.get({ plain: true }));

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
