import { Client } from "@pcc/shared";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { ClientPassModel } from "./clientPassModel";

export class ClientModel extends Model implements Client {
  declare id: string;
  declare username: string;
  declare name: string;
  declare surname: string;
  declare email: string;

  public static associate() {
    ClientModel.hasOne(ClientPassModel, {
      sourceKey: "id",
      foreignKey: "id",
    });
  }
}

ClientModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: false,
  },
);
