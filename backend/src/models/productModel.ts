import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Category } from "./categoryModel";
import { ProductCategory } from "./productCategoriesModel";

// CREATE TABLE `products` (
//   `id` varchar(255) NOT NULL,
//   `name` varchar(255) NOT NULL,
//   `href` varchar(255) NOT NULL,
//   `price` decimal(10,2) NOT NULL,
//   `discount` decimal(4,0) DEFAULT NULL,
//   `seller` varchar(255) NOT NULL,
//   `shadow_id` varchar(255) DEFAULT NULL,
//   `offer_id` varchar(255) DEFAULT NULL,
//   `brand` varchar(255) NOT NULL,
//   `thumbnail` varchar(255) NOT NULL,
//   `flags` varchar(255) DEFAULT NULL,
//   `condition_status` varchar(255) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// )

export class Product extends Model {
  declare id: string;
  declare name: string;
  declare href: string;
  declare price: number;
  declare discount: number;
  declare seller: string;
  declare shadow_id: string;
  declare offer_id: string;
  declare brand: string;
  declare thumbnail: string;
  declare flags: string;
  declare condition_status: string;

  public static associate() {
    Product.belongsToMany(Category, {
      through: ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(4, 0),
      allowNull: true,
    },
    seller: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shadow_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    offer_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    condition_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);
