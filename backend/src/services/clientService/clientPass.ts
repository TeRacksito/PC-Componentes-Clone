import { ClientPassModel } from "../../models";

export const getClientPasswordByIdFromDB = async (id: string) => {
  return ClientPassModel.findByPk(id);
};
