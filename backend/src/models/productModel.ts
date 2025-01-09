import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { CategoryModel } from "./categoryModel";
import { ProductCategoryModel } from "./productCategoriesModel";
import { FlagModel } from "./flagsModel";
import { ProductFlagModel } from "./productFlagsModel";
import { Product } from "@pcc/shared";

// CREATE TABLE `products` (
//   `id` varchar(255) NOT NULL,
//   `name` varchar(255) NOT NULL,
//   `price` decimal(6,2) NOT NULL,
//   `discount` tinyint unsigned DEFAULT NULL,
//   `seller` varchar(64) NOT NULL,
//   `shadow_id` int unsigned DEFAULT NULL,
//   `offer_id` char(36) DEFAULT NULL,
//   `brand` varchar(64) NOT NULL,
//   `thumbnail` varchar(255) NOT NULL,
//   PRIMARY KEY (`id`)
// )

export class ProductModel extends Model implements Product {
  declare id: string;
  declare name: string;
  declare price: number;
  declare discount: number;
  declare seller: string;
  declare shadow_id: number;
  declare offer_id: string;
  declare brand: string;
  declare thumbnail: string;

  public static associate() {
    ProductModel.belongsToMany(CategoryModel, {
      through: ProductCategoryModel,
      foreignKey: "product_id",
      otherKey: "category_id",
    });

    ProductModel.hasMany(ProductCategoryModel, {
      foreignKey: "product_id",
    });

    ProductModel.belongsToMany(FlagModel, {
      through: ProductFlagModel,
      foreignKey: "product_id",
      otherKey: "flag_id",
    });

    ProductModel.hasMany(ProductFlagModel, {
      foreignKey: "product_id",
    });
  }
}

ProductModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
    },
    seller: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    shadow_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    offer_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);
