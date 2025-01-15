import { Op } from "sequelize";
import { ClientModel, ClientPassModel } from "../../models";
import { v4 as uuidv4 } from "uuid";

export const getClientByIdFromDB = async (id: string) => {
  return ClientModel.findByPk(id);
};

export const getClientByIdentifierFromDB = async (identifier: string) => {
  return ClientModel.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }],
    },
  });
};

export const signUpClientToDB = async (
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
) => {
  const newId = uuidv4();
  const newClient = await ClientModel.create({
    id: newId,
    username,
    name,
    surname,
    email,
  });  

  await ClientPassModel.create({
    id: newId,
    password_hash: password,
  });

  return newClient;
};
