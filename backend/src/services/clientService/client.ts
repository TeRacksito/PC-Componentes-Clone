import { Op } from "sequelize";
import { ClientModel } from "../../models";

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
