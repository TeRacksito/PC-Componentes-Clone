import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { ClientProduct } from "@pcc/shared";
import { ClientModel, ProductModel } from "..";

export class ClientProductModel extends Model implements ClientProduct {
  declare client_id: string;
  declare product_id: string;
  declare quantity: number;

  public static associate() {
    ClientProductModel.belongsTo(ClientModel, {
      foreignKey: "client_id",
    });

    ClientProductModel.belongsTo(ProductModel, {
      foreignKey: "product_id",
    });
  }
}

ClientProductModel.init(
  {
    client_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clients_products",
    timestamps: false,
  },
);
