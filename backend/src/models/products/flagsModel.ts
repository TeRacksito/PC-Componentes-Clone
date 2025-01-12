import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { ProductFlagModel } from "./productFlagsModel";
import { ProductModel } from "./productModel";
import { Flag } from "@pcc/shared";

// CREATE TABLE `flags` (
//   `id` varchar(25) NOT NULL,
//   `name` varchar(25) DEFAULT NULL,
//   `bg_color` char(6) DEFAULT NULL,
//   `border_color` char(6) DEFAULT NULL,
//   `font_color` char(6) DEFAULT NULL,
//   `description` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// )

export class FlagModel extends Model implements Flag {
  declare id: string;
  declare name: string;
  declare bg_color: string;
  declare border_color: string;
  declare font_color: string;
  declare description: string;

  public static associate() {
    FlagModel.belongsToMany(ProductModel, {
      through: ProductFlagModel,
      foreignKey: "flag_id",
      otherKey: "product_id",
    });

    FlagModel.hasMany(ProductFlagModel, {
      foreignKey: "flag_id",
    });
  }
}

FlagModel.init(
  {
    id: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    bg_color: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    border_color: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    font_color: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "flags",
    timestamps: false,
  },
);
