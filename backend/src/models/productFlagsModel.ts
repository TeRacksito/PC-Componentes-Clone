import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { ProductModel } from "./productModel";
import { FlagModel } from "./flagsModel";

// CREATE TABLE `product_flags` (
//   `product_id` varchar(255) NOT NULL,
//   `flag_id` varchar(25) NOT NULL,
//   PRIMARY KEY (`product_id`,`flag_id`),
//   KEY `flag_id` (`flag_id`),
//   FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
//   FOREIGN KEY (`flag_id`) REFERENCES `flags` (`id`)
// )

export class ProductFlagModel extends Model {
  declare product_id: string;
  declare flag_id: string;

  public static associate() {
    ProductFlagModel.belongsTo(ProductModel, {
      foreignKey: "product_id",
    });
    ProductFlagModel.belongsTo(FlagModel, {
      foreignKey: "flag_id",
    });
  }
}

ProductFlagModel.init(
  {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    flag_id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "product_flags",
    timestamps: false,
  }
);
