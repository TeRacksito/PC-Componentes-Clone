import { Op } from "sequelize";
import { ClientModel, ClientPassModel } from "../../models";

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
  const newClient = await ClientModel.create({
    name,
    surname,
    email,
    username,
  });  

  await ClientPassModel.create({
    id: newClient.id,
    password_hash: password,
  });

  return newClient;
};
