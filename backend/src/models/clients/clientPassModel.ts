import { hash } from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { ClientModel } from "./clientModel";

export class ClientPassModel extends Model {
  declare id: string;
  declare password_hash: string;

  public static associate() {
    ClientPassModel.belongsTo(ClientModel, {
      foreignKey: "id",
      targetKey: "id",
    });
  }
}

ClientPassModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients_pass",
    timestamps: false,

    hooks: {
      beforeCreate: async (clientPass) => {
        clientPass.password_hash = await hash(clientPass.password_hash, 10);
      },
      beforeUpdate: async (clientPass) => {
        if (clientPass.changed("password_hash")) {
          clientPass.password_hash = await hash(clientPass.password_hash, 10);
        }
      },
    },
  },
);
